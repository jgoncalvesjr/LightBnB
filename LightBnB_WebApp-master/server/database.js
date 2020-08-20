const properties = require('./json/properties.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb',
  port: 5432
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * FROM users
  WHERE email = $1
  `, [email])
    .then(res => res.rows[0])
    .catch(null);
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users
  WHERE id = $1
  `, [id])
    .then(res => res.rows[0]);
};

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const { name, email, password } = user;
  const values = [name, email, password];
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, values)
    .then(res => res.rows);
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const values = [guest_id, limit];
  return pool.query(`
  SELECT reservations.*, properties.*, AVG(rating) AS average_rating
  FROM reservations
  JOIN properties ON property_id = properties.id
  JOIN property_reviews ON property_reviews.property_id = properties.id
  WHERE reservations.guest_id = $1
  AND end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY start_date
  LIMIT $2;
  `, values)
    .then(res => res.rows);
};

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3

  // Search includes city
  if (options.city) {
    queryParams.push(`%${options.city.toLowerCase()}%`);
    queryString += `WHERE LOWER(city) LIKE $${queryParams.length} `;
  }

  // Search includes owner
  if (options.owner_id) {
    queryParams.push(Number(options.owner_id));

    if (queryString.includes('WHERE')) {
      queryString += `AND owner_id = $${queryParams.length} `;
    } else {
      queryString += `WHERE owner_id = $${queryParams.length} `;
    }

  }

  // Search includes min/max price
  if (options.minimum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night) * 100);

    if (queryString.includes('WHERE')) {
      queryString += `AND cost_per_night >= $${queryParams.length} `;
    } else {
      queryString += `WHERE cost_per_night >= $${queryParams.length} `;
    }

  }

  if (options.maximum_price_per_night) {
    queryParams.push(Number(options.maximum_price_per_night) * 100);

    if (queryString.includes('WHERE')) {
      queryString += `AND cost_per_night <= $${queryParams.length} `;
    } else {
      queryString += `WHERE cost_per_night <= $${queryParams.length} `;
    }

  }

  // Moving GROUP BY since AVG rating uses HAVING
  queryString +=`\n  GROUP BY properties.id `;

  // Search includes min rating
  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `\n  HAVING AVG(property_reviews.rating) >= $${queryParams.length} `;

  }
  // 4
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(null);
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const keys = Object.keys(property);
  const values = keys.map(key => {
    if (key === 'cost_per_night') {
      return property[key] * 100;
    }
    return property[key];
  });

  let insertString = `INSERT INTO PROPERTIES (`;
  
  for (let i = 0; i < keys.length; i++) {
    if (i === 0) {
      insertString += `${keys[i]}`;
    } else {
      insertString += `, ${keys[i]}`;
    }
  }

  insertString += ')\n VALUES (';

  for (let v = 1; v <= keys.length; v++) {
    if (v === 1) {
      insertString += `$${v}`;
    } else {
      insertString += `, $${v}`;
    }
  }

  insertString += ') RETURNING *;';

  return pool.query(insertString, values)
    .then(res => res.rows[0]);
};
exports.addProperty = addProperty;
