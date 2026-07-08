const reportModel = require("../model/reportModel");

function createReport(req, res) {

    const report = req.body;

    reportModel.createReport(report, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.status(201).json({
            message: "Daily report created successfully."
        });

    });

}

module.exports = {
    createReport
};