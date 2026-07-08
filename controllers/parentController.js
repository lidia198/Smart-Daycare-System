const db = require('../config/db');

exports.getDashboard = (req, res) => {
    const { parentId } = req.params;

    // Get all children for this parent
    db.query('SELECT * FROM children WHERE parent_id = ?', [parentId], (err, children) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to fetch children' });
        }

        if (children.length === 0) {
            return res.status(404).json({ message: 'No children found for this parent' });
        }

        const childIds = children.map(child => child.id);

        // Get recent attendance for these children
        db.query(
            `SELECT * FROM attendance WHERE child_id IN (?) ORDER BY date DESC LIMIT 10`,
            [childIds],
            (err, attendance) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Failed to fetch attendance' });
                }

                // Get recent daily reports
                db.query(
                    `SELECT * FROM daily_reports WHERE child_id IN (?) ORDER BY report_date DESC LIMIT 10`,
                    [childIds],
                    (err, reports) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ message: 'Failed to fetch reports' });
                        }

                        // Get payment history
                        db.query(
                            `SELECT * FROM payment WHERE parent_id = ? ORDER BY payment_date DESC`,
                            [parentId],
                            (err, payments) => {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).json({ message: 'Failed to fetch payments' });
                                }

                                // Get announcements for parents
                                db.query(
                                    `SELECT * FROM announcement WHERE target_role IN ('all', 'parent') ORDER BY created_at DESC LIMIT 5`,
                                    (err, announcements) => {
                                        if (err) {
                                            console.error(err);
                                            return res.status(500).json({ message: 'Failed to fetch announcements' });
                                        }

                                        // Send everything together
                                        res.status(200).json({
                                            children,
                                            attendance,
                                            daily_reports: reports,
                                            payments,
                                            announcements
                                        });
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    });
};