import bookshelf from '../db';

const TABLE_NAME = 'todos';

/**
 * Todos model.
 */
class Todos extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }
}

export default Todos;
