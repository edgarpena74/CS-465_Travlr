export interface Trip {
  // Internal primary key in MongoDB
  _id: string;
  // Unique trip code
  code: string;
  // Trip name
  name: string;
  // Length of trip
  length: string;
  // Start of trip
  start: Date;
  // Resort name of individual trip
  resort: string;
  // Cost per person
  perPerson: string;
  // Image of trip
  image: string;
  // Description of the trip
  description: string;
}
