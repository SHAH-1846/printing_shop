const express = require('express');
const router = express.Router();
const accessControl = require('../utils/access-control').accessControl;
const jobsController = require('../controllers/jobsController');

const setAccessControl = (access_type) => {
    return (req, res, next) => {
        accessControl(access_type, req, res, next);
    }
};

router.get('/entities', setAccessControl('1'), jobsController.fetchAllEntities);
router.get('/delivery-modes', setAccessControl('1'), jobsController.fetchAllDeliveryModes);
router.get('/document-modes', setAccessControl('1'), jobsController.fetchAllDocumentModes);
router.get('/document-types', setAccessControl('1'), jobsController.fetchAllDocumentTypes);
router.get('/clients', setAccessControl('1'), jobsController.fetchAllClients); // deliver to and requested by dropdown section in the UI images
router.get('/job-types', setAccessControl('1'), jobsController.fetchAllJobTypes);
router.get('/job-status', setAccessControl('1'), jobsController.fetchAllJobStatus);


router.post('/create-job', setAccessControl('1'), jobsController.createJob);

module.exports = router;