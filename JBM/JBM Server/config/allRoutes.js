let routes = require('express').Router();

routes.use("/admin/data", require('../controller/DataController'));
routes.use("/admin/member", require('../controller/MemberController'));
routes.use("/admin/manage-tags", require('../controller/ManageTagsController'));
routes.use("/admin/bank", require('../controller/BankController'));

module.exports = routes;