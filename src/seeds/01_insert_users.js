/**
 * Delete all existing entries and seed users table.
 *
 * @param  {Object} knex
 * @return {Promise}
 */
export function seed(knex) {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert([
        {
          name: 'sagar Acharya',
          updated_at: new Date(),
          password: 'helloworld',
          username: 'ssa',
          email: 'hello@gmail.com'
        },
        {
          name: 'John Doe',
          updated_at: new Date(),
          password: 'helloworld',
          username: 'ssa1',
          email: 'hello1@gmail.com'
        }
      ]);
    });
}
