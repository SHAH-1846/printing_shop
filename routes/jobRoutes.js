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
router.get('/delivery_modes', setAccessControl('1'), jobsController.fetchAllDeliveryModes);
router.get('/document_modes', setAccessControl('1'), jobsController.fetchAllDocumentModes);
router.get('/document_types', setAccessControl('1'), jobsController.fetchAllDocumentTypes);
router.get('/clients', setAccessControl('1'), jobsController.fetchAllClients); // deliver to and requested by dropdown section in the UI images
router.get('/job_types', setAccessControl('1'), jobsController.fetchAllJobTypes);
router.get('/job_status', setAccessControl('1'), jobsController.fetchAllJobStatus);


router.post('/create_job', setAccessControl('1'), jobsController.createJob);

module.exports = router;