const avatarBucketparams = {
    Bucket: 'caresy-avatar-bucket', 
    Key: Date.now().toString(), 
    Expires: 60 * 60, 
    ACL: 'bucket-owner-full-control', 
    ContentType:'image/jpeg'
};



module.exports = {
    avatarBucketparams,
}