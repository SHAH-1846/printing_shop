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
router.post('/create_job', setAccessControl('1'), jobsController.createJob);

module.exports = router;