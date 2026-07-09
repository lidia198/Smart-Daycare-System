const db = require('../config/db');

exports.getDashboard = (req, res) => {
    const { caregiverId } = req.params;

    db.query(
        `SELECT c.* , e.classroom, e.status AS enrollment_status
         FROM children c
         JOIN enrollment e ON c.id = e.child_id
         WHERE e.caregiver_id = ?`,
        [caregiverId],
        (err, children) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to fetch assigned children' });
            }

            if (children.length === 0) {
                return res.status(404).json({ message: 'No children assigned to this caregiver' });
            }

            const childIds = children.map(child => child.id);

            db.query(
                `SELECT * FROM attendance WHERE child_id IN (?) AND date = CURDATE()`,
                [childIds],
                (err, attendance) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: 'Failed to fetch attendance' });
                    }

                    db.query(
                        `SELECT * FROM daily_reports WHERE caregiver_id = ? ORDER BY report_date DESC LIMIT 10`,
                        [caregiverId],
                        (err, reports) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({ message: 'Failed to fetch reports' });
                            }

                            res.status(200).json({
                                assigned_children: children,
                                today_attendance: attendance,
                                recent_reports: reports
                            });
                        }
                    );
                }
            );
        }
    );
};

// Caregiver marks attendance for a child
exports.markAttendance = (req, res) => {
    const { child_id, date, check_in, check_out, status, recorded_by } = req.body;

    if (!child_id || !date || !recorded_by) {
        return res.status(400).json({ message: 'child_id, date, and recorded_by are required' });
    }

    const query = `
        INSERT INTO attendance (child_id, date, check_in, check_out, status, recorded_by)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [child_id, date, check_in, check_out, status || 'present', recorded_by], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to mark attendance' });
        }
        res.status(201).json({ message: 'Attendance recorded successfully', attendanceId: result.insertId });
    });
};