module.exports = {
    db: process.env.MONGODB_URI || 'mongodb://localhost/startup',
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || '123secret456!',

    mailgun: {
        apiKey: process.env.MAILGUN_API_KEY || '',
        domain: process.env.MAILGUN_DOMAIN || ''
    },

    aws_bucket: process.env.S3_BUCKET || 'ssm-course',

    onesignal: {
        key: process.env.ONESIGNAL_KEY || '',
        app: process.env.ONESIGNAL_APP || ''
    },
};
