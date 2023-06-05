const removeSensitiveData = (data) => {
    data.password = undefined;
    data.tokens = undefined;
    data.createdAt = undefined;
    data.updatedAt = undefined;
    data.__v = undefined;
    data.profilepicture = undefined;
    data.otp = undefined;
    
    return data;
  };

module.exports = {removeSensitiveData}