from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import jwt
from functools import wraps

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///running.db'
app.config['SECRET_KEY'] = 'votre_clé_secrète'  # À changer en production
db = SQLAlchemy(app)


# Modèles de données
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    runs = db.relationship('Run', backref='user', lazy=True)

class Run(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    distance = db.Column(db.Float, nullable=False)  # en kilomètres
    duration = db.Column(db.Integer, nullable=False)  # en secondes
    average_pace = db.Column(db.Float, nullable=False)  # min/km
    calories = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Décorateur pour protéger les routes
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token manquant!'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({'message': 'Token invalide!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

# Routes pour l'authentification
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email déjà utilisé!'}), 400

    user = User(
        username=data['username'],
        email=data['email'],
        password=data['password']  # À hasher en production!
    )
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'Utilisateur créé avec succès!'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and user.password == data['password']:  # Utiliser verify_password en production
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(days=1)
        }, app.config['SECRET_KEY'])
        return jsonify({'token': token})
    
    return jsonify({'message': 'Identifiants invalides!'}), 401

# Routes pour les courses
@app.route('/api/runs', methods=['POST'])
@token_required
def create_run(current_user):
    data = request.get_json()
    
    new_run = Run(
        distance=data['distance'],
        duration=data['duration'],
        average_pace=data['duration']/data['distance']/60,  # Calcul du pace moyen
        calories=data.get('calories'),
        user_id=current_user.id
    )
    
    db.session.add(new_run)
    db.session.commit()
    
    return jsonify({'message': 'Course enregistrée!'}), 201

@app.route('/api/runs', methods=['GET'])
@token_required
def get_runs(current_user):
    runs = Run.query.filter_by(user_id=current_user.id).all()
    return jsonify([{
        'id': run.id,
        'date': run.date,
        'distance': run.distance,
        'duration': run.duration,
        'average_pace': run.average_pace,
        'calories': run.calories
    } for run in runs])

@app.route('/api/runs/<int:run_id>', methods=['GET'])
@token_required
def get_run(current_user, run_id):
    run = Run.query.filter_by(id=run_id, user_id=current_user.id).first()
    if not run:
        return jsonify({'message': 'Course non trouvée!'}), 404
        
    return jsonify({
        'id': run.id,
        'date': run.date,
        'distance': run.distance,
        'duration': run.duration,
        'average_pace': run.average_pace,
        'calories': run.calories
    })

@app.route('/api/runs/<int:run_id>', methods=['PUT'])
@token_required
def update_run(current_user, run_id):
    run = Run.query.filter_by(id=run_id, user_id=current_user.id).first()
    if not run:
        return jsonify({'message': 'Course non trouvée!'}), 404
    
    data = request.get_json()
    run.distance = data.get('distance', run.distance)
    run.duration = data.get('duration', run.duration)
    run.average_pace = run.duration/run.distance/60
    run.calories = data.get('calories', run.calories)
    
    db.session.commit()
    return jsonify({'message': 'Course mise à jour!'})

@app.route('/api/runs/<int:run_id>', methods=['DELETE'])
@token_required
def delete_run(current_user, run_id):
    run = Run.query.filter_by(id=run_id, user_id=current_user.id).first()
    if not run:
        return jsonify({'message': 'Course non trouvée!'}), 404
        
    db.session.delete(run)
    db.session.commit()
    return jsonify({'message': 'Course supprimée!'})

# Statistiques utilisateur
@app.route('/api/stats', methods=['GET'])
@token_required
def get_stats(current_user):
    runs = Run.query.filter_by(user_id=current_user.id).all()
    
    if not runs:
        return jsonify({
            'total_distance': 0,
            'total_runs': 0,
            'average_pace': 0,
            'total_duration': 0
        })
    
    total_distance = sum(run.distance for run in runs)
    total_duration = sum(run.duration for run in runs)
    average_pace = total_duration/total_distance/60 if total_distance > 0 else 0
    
    return jsonify({
        'total_distance': total_distance,
        'total_runs': len(runs),
        'average_pace': average_pace,
        'total_duration': total_duration
    })

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)