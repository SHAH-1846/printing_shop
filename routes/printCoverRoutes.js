const express = require('express');
const router = express.Router();
const accessControl = require('../utils/access-control').accessControl;
const jobsController = require('../controllers/jobsController');
const printCoverController = require('../controllers/printCoverController');

const setAccessControl = (access_type) => {
    return (req, res, next) => {
        accessControl(access_type, req, res, next);
    }
};



router.get('/print-cover-operators', setAccessControl('1'), printCoverController.fetchAllPrintCoverOperators);
router.get('/print-cover-colors', setAccessControl('1'), printCoverController.fetchAllPrintCoverColors);
router.get('/print-cover-status', setAccessControl('1'), printCoverController.fetchAllPrintCoverStatus);
router.get('/print-cover-printers', setAccessControl('1'), printCoverController.fetchAllPrintCoverPrinters);
router.get('/print-cover-paper-types', setAccessControl('1'), printCoverController.fetchAllPrintCoverPaperTypes);
router.get('/print-cover-sides', setAccessControl('1'), printCoverController.fetchAllPrintCoverSides);
router.get('/print-cover-machines', setAccessControl('1'), printCoverController.fetchAllPrintCoverMachines);
router.get('/print-cover-materials', setAccessControl('1'), printCoverController.fetchAllPrintCoverMaterials);



router.post('/print-cover', setAccessControl('1'), printCoverController.createNew);

module.exports = router;