const db = require("../config/db");

function createReport(report, callback) {

    const sql = `
        INSERT INTO daily_reports
        (child_id, caregiver_id, report_date, mood, meals, nap_duration, activities, teacher_comment)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            report.child_id,
            report.caregiver_id,
            report.report_date,
            report.mood,
            report.meals,
            report.nap_duration,
            report.activities,
            report.teacher_comment
        ],
        callback
    );
}

module.exports = {
    createReport
};