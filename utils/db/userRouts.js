/**
 * Rounter for sending fount end database requests to the back end
 */

import express from 'express';
import { config } from './config.js';
import Database from './database.js';

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

//** GET routs **\\

/**
* Get the user's id based on the provided username.
* @function
* @param {String} username - the username of the user
* @returns {Object} - the user's id
*/
router.get('/id/:username', async (req, res) => {
  try {
    // Get the id with the specified username
    const username = req.params.username;
    console.log(`username: ${username}`);
    if (username) {
      const result = await database.readIdByUsername(username);
      console.log(`user_id: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

/**
* Get the user's username based on the provided email.
* @function
* @param {String} email - the email of the user
* @returns {Object} - the user's username
*/
router.get('/username/:email', async (req, res) => {
  try {
    // Get the username with the specified email
    const email = req.params.email;
    console.log(`email: ${email}`);
    if (email) {
      const result = await database.getUsernameByEmail(email);
      console.log(`username: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

/**
* Get the user's info based on the provided email.
* @function
* @param {String} email - the email of the user
* @returns {Object} - the user's info
*/
router.get('/userInfo/:email', async (req, res) => {
  try {
    // Get the user with the specified email
    const email = req.params.email;
    console.log(`email: ${email}`);
    if (email) {
      const result = await database.getUserByEmail(email);
      console.log(`userData: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

/**
* Checks if the username exists in the database
* @function
* @param {String} username - the username of the user
* @returns {Boolean} - true if username exists in the database
*/
router.get('/checkusername/:username', async (req, res) => {
  try {
    // check if username is already used
    const username = req.params.username;
    console.log(`username: ${username}`);
    if (username) {
      const result = await database.checkUsernameAvailability(username);
      console.log(`usernameCheck: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

/**
* Checks if the email exists in the database
* @function
* @param {String} email - the email of the user
* @returns {Boolean} - true if email exists in the database
*/
router.get('/checkemail/:email', async (req, res) => {
  try {
    // check if email is already used
    const email = req.params.email;
    console.log(`email: ${email}`);
    if (email) {
      const result = await database.checkEmailAvailability(email);
      console.log(`emailCheck: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

/**
* Gets the salt for the user with the specified email address
* @function
* @param {String} email - the email of the user
* @returns {String} - user's salt
*/
router.get('/salt/:email', async (req, res) => {
  try {
    // Get the user with the specified email
    const email = req.params.email;
    console.log(`email: ${email}`);
    if (email) {
      const result = await database.getSalt(email);
      console.log(`salt: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

/**
* Checks if the provided password hash and email are in the same row of the database
* @function
* @param {String} hashedPass - the hashedPass of the user
* @param {String} email - the email of the user
* @returns {Boolean} - true if hashed pass and email match row entries
*/
router.get('/login/:hashedPass/:email', async (req, res) => {
  try {
    // Get the user with the specified email
    const hashedPass = req.params.hashedPass;
    const email = req.params.email;
    console.log(`hashedPass: ${hashedPass}`);
    console.log(`email: ${email}`);
    if (hashedPass && email) {
      const result = await database.checkHashedPass(hashedPass, email);
      console.log(`pw_check: ${JSON.stringify(result)}`);
      res.status(200).json(result);
      console.log(result)
    } else {
      res.status(404);
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err?.message });
  }
});

/**
* Get user's username by email
* @function
* @param {String} email - the email of the user
* @returns {Object} - object containing user's username
*/
router.get('/userInfo/:email', async (req, res) => {
  try {
    // Get the user with the specified email
    const email = req.params.email;
    console.log(`email: ${email}`);
    if (email) {
      const result = await database.getUserByEmail(email);
      console.log(`userData: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

/**
 * Route serving user likes based on email.
 * @param {string} req.params.email - The email of the user.
 * @returns {Object} 200 - An array of user likes
 * @returns {Error}  404 - User not found
 * @returns {Error}  500 - Server error
 */
router.get('/likes/:email', async (req, res) => {
  try {
    // Get the user with the specified email
    const email = req.params.email;
    console.log(`email: ${email}`)
    if (email) {
      const result = await database.getUserLikesByEmail(email);
      console.log(`likes: ${JSON.stringify(result)}`)
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
})

//** POST routs **\\

/**
 * Route for creating a new user
 * @param {Object} req.body - new user's information
 * @returns {Object} 201 - response for new user added to database
 * @returns {Error}  500 - Server error
 */
router.post('/', async (req, res) => {
  try {
    // Create a user
    const user = req.body;
    console.log(`user: ${JSON.stringify(user)}`);
    const rowsAffected = await database.create(user);
    res.status(201).json({ rowsAffected });
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

//** PUT routs **\\

/**
 * update a user by a specific id
 *
 * @async
 * @function
 * @returns {int} rowsAffected - the number of rows affected
 * */
router.put('/id/:id', async (req, res) => {
  try {
    // Update the user with the specified ID
    const userId = req.params.id;
    console.log(`userId: ${userId}`);
    const user = req.body;
    console.log(user)

    if (userId && user) {
      delete user.id;
      console.log(`user: ${JSON.stringify(user)}`);
      const rowsAffected = await database.update(userId, user);
      res.status(200).json({ rowsAffected });
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
    console.log(err);
  }
});

/**
 * Route serving user likes update based on user ID and pet ID.
 * @param {string} req.params.userID - The ID of the user.
 * @param {string} req.params.petID - The ID of the pet.
 * @returns {Object} 200 - An object containing the number of rows affected
 * @returns {Error}  404 - User or pet not found
 * @returns {Error}  500 - Server error
 */
router.put('/liked/:userID/:petID', async (req, res) => {
  try {
    // Update the user with the specified ID
    const userId = req.params.userID;
    console.log(`userId: ${userId}`);
    const petId = req.params.petID;
    console.log(petId)

    if (userId && petId) {
      console.log(`petId: ${JSON.stringify(petId)}`);
      const rowsAffected = await database.updateLikes(userId, petId);
      res.status(200).json({ rowsAffected });
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
    console.log(err);
  }
});

router.put('/liked/:userID/:petID', async (req, res) => {
  try {
    // Update the user with the specified ID
    const userId = req.params.userID;
    console.log(`userId: ${userId}`);
    const petId = req.params.petID;
    console.log(petId)

    if (userId && petId) {
      console.log(`petId: ${JSON.stringify(petId)}`);
      const rowsAffected = await database.updateLikes(userId, petId);
      res.status(200).json({ rowsAffected });
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
    console.log(err);
  }
});

//** DELETE routs **\\

/**
 * Route for deleting a row
 * @param {Number} req.params.email - The email of the user.
 * @returns {Object} 200 - An array of user likes
 * @returns {Error}  404 - User not found
 * @returns {Error}  500 - Server error
 */
router.delete('/:id', async (req, res) => {
  try {
    // Delete the user with the specified ID
    const userId = req.params.id;
    console.log(`userId: ${userId}`);

    if (!userId) {
      res.status(404);
    } else {
      const rowsAffected = await database.delete(userId);
      res.status(204).json({ rowsAffected });
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

export default router;