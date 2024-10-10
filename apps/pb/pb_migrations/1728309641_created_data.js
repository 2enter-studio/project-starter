/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "s4rv9pmgeg1obr7",
    "created": "2024-10-07 14:00:41.495Z",
    "updated": "2024-10-07 14:00:41.495Z",
    "name": "data",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0mxf8tsa",
        "name": "text",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("s4rv9pmgeg1obr7");

  return dao.deleteCollection(collection);
})
