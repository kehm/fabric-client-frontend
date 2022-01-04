export default {
    HttpTimeout: process.env.REACT_APP_HTTP_TIMEOUT || '',
    ClientUrl: process.env.REACT_APP_CLIENT_URL || '',
    OrganizationName: process.env.REACT_APP_ORGANIZATION_NAME || '',
    DefaultAffiliation: process.env.REACT_APP_DEFAULT_AFFILIATION || '',
    DefaultAdminName: process.env.REACT_APP_DEFAULT_ADMIN_NAME || '',
    DefaultAdminSecret: process.env.REACT_APP_DEFAULT_ADMIN_SECRET || '',
};
