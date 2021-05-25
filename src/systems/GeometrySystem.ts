import { Object3DC, GeometryC } from "../components";
import { applyQuery } from "../ecs";
import * as THREE from "three";

export const GeometrySystem = {
  init: function (world) {
    const queries = [Object3DC, GeometryC];
    this.scene = world.scene;

    this.entities = applyQuery(world.entities, queries);

    this.entities.forEach((ent) => {
      const obj = ent.components.get(Object3DC.type);
      const geo = ent.components.get(GeometryC.type);

      let geometry = null;

      if (geo) {
        switch (geo.type) {
          case "Box":
            geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
            break;
          case "Sphere":
            geometry = new THREE.SphereGeometry(0.1, 0.1, 0.1);
            break;
        }

        if (geometry) {
          const material = new THREE.MeshNormalMaterial();
          const mesh = new THREE.Mesh(geometry, material);

          const obj3D = world.scene.getObjectById(obj.id);
 
          obj3D.add(mesh);
        }
      }
    });
  },
};
