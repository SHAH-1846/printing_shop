const express = require('express');
const router = express.Router();
const accessControl = require('../utils/access-control').accessControl;
const finishingAndBindingController = require('../controllers/finishingAndBindingController');


const setAccessControl = (access_type) => {
    return (req, res, next) => {
        accessControl(access_type, req, res, next);
    }
};

router.get('/binding_operators', setAccessControl('1'), finishingAndBindingController.fetchAllBindingOperators);
router.get('/binding_types', setAccessControl('1'), finishingAndBindingController.fetchAllBindingTypes);
router.get('/binding_status', setAccessControl('1'), finishingAndBindingController.fetchAllBindingStatus);
router.get('/binding_materials', setAccessControl('1'), finishingAndBindingController.fetchAllBindingMaterials);
router.get('/materials', setAccessControl('1'), finishingAndBindingController.fetchAllMaterials);
router.get('/binding_unit_costs', setAccessControl('1'), finishingAndBindingController.fetchAllBindingUnitCosts);




router.post('/finishing_and_binding', setAccessControl('1'), finishingAndBindingController.createNew);

module.exports = router;