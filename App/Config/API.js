const mainUrl = 'http://6second-api-dev.eu-west-1.elasticbeanstalk.com/'
export const driverRegistration = mainUrl + 'driver/api/drivers'
export const driverLogin = mainUrl + 'driver/api/drivers/token'

export const login = mainUrl + 'auth/send-sms'
export const verify = mainUrl + 'auth/verify-user'
// export const login = mainUrl + 'login'
export const userRegistration = mainUrl + 'user/registration'
export const companyRegistration = mainUrl + 'company/registration'
export const countries = mainUrl + 'country'
// export const cities = mainUrl + 'city'
export const categories = mainUrl + 'category'
export const addJob = mainUrl + 'job'
export const getJobs = mainUrl + 'job'
export const getJob = mainUrl + 'job'
export const deleteJob = mainUrl + 'delete-job'
export const companyJobs = mainUrl + 'company-jobs'
export const getUserJobs = mainUrl + 'user-jobs'
export const getUserNotification = mainUrl + 'user-notify'
export const getUserCV = mainUrl + 'user-cv'
export const cvStatus = mainUrl + 'cv-status'
export const getCVs = mainUrl + 'job-cv'
export const getCV = mainUrl + 'cv'
export const me = mainUrl + 'me'
export const terms = mainUrl + 'terms'
// export const subcategories = mainUrl + 'subcategory'

export const toUrl = (data) => {
  return Object.keys(data).map(function (k) {
	    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&')
}
