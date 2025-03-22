import moment from 'moment';

export const formatDate = (timestamp) => moment(timestamp).format("DD-MM-YYYY HH:mm:ss");
