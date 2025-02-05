const Run = require('../models/Run');
const Stats = require('../models/Stats');

// Ajouter cette méthode
exports.getRuns = async (req, res) => {
  try {
    const [runs] = await db.execute(
      'SELECT * FROM runs WHERE user_id = ? ORDER BY start_time DESC',
      [req.user.id]
    );
    res.json(runs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.startRun = async (req, res) => {
  try {
    const run = await Run.create({
      user: req.user.id,
      startLocation: req.body.startLocation,
      startTime: new Date()
    });
    res.status(201).json(run);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const run = await Run.findById(req.params.id);
    if (!run) {
      return res.status(404).json({ message: 'Run not found' });
    }
    run.route.push(req.body.location);
    await run.save();
    res.json(run);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const [stats] = await db.execute(
      `SELECT 
        COUNT(*) as totalRuns,
        SUM(distance) as totalDistance,
        AVG(distance / (duration / 3600)) as avgSpeed
      FROM runs 
      WHERE user_id = ?`,
      [req.user.id]
    );
    res.json(stats[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.endRun = async (req, res) => {
  try {
    const run = await Run.findById(req.params.id);
    if (!run) {
      return res.status(404).json({ message: 'Run not found' });
    }
    run.endLocation = req.body.endLocation;
    run.endTime = new Date();
    run.distance = calculateDistance(run.route);
    run.duration = (run.endTime - run.startTime) / 1000;
    await run.save();
    
    await Stats.updateOne(
      { user: req.user.id },
      {
        $inc: {
          totalDistance: run.distance,
          totalDuration: run.duration,
          totalRuns: 1
        }
      },
      { upsert: true }
    );
    
    res.json(run);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};