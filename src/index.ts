import { extend, World, newComponent } from "./ecs/index";
import { RenderSystem } from "./systems/RenderSystem";
import { Object3DSystem } from "./systems/Object3DSystem";
import { AssetManager } from "./ecs/assetManager";
import { Asset, Camera, HemisphereLight, PointLight } from "./ecs/achetypes";
import { AssetSystem } from "./systems/AssetSystem";
import { OrbitControlsSystem } from "./systems/OrbitControlsSystem";
import { PointLightSystem } from "./systems/PointLightSystem";
import { Vector3 } from "three";
import { CameraSystem } from "./systems/CameraSystem";
import { HemisphereLightSystem } from "./systems/HemisphereLightSystem";
import { MaterialC, CCMaterialC } from "./ecs/components";
import { MaterialSystem } from "./systems/MaterialSystem";
import { CCMaterialSystem } from "./systems/CCMaterialSystem";

/** Adds a cube. Nothig more to say :) */
(async () => {
  const assetManager = new AssetManager();

  assetManager
    .addAsset("assets/models/env.glb", "env")
    .addAsset("assets/models/chair.glb", "chair")
    .addAsset("assets/models/branch.glb", "branch")
    .addAsset("assets/models/girlinchair.glb", "girlinchair")
    .addAsset("assets/textures/env.jpg", "env_tex"); // Environmental texture for PBR material.

  // Wait untill all assets are loaded
  await assetManager.load();

  const world = new World(assetManager.assets);

  const cam = Camera(new Vector3(0, 2, 4));


  const env = extend(
    Asset({
      src: "assets/models/env.glb",
    }),
    [newComponent(CCMaterialC, {})]
  );

  const chair = extend(
    Asset({
      src: "assets/models/chair.glb",
    }),
    [newComponent(CCMaterialC, {})]
  );

  const girl = extend(Asset({
    src: "assets/models/girlinchair.glb",
    scale: new Vector3(0.18, 0.18, 0.18),
    position: new Vector3(0, 0, 0.9),
    part: "/Root/BODY",
  }),
  [newComponent(MaterialC, { shader: "Void" })]
  );
  

  const wires = extend(
    Asset({
      src: "assets/models/girlinchair.glb",
      scale: new Vector3(0.18, 0.18, 0.18),
      position: new Vector3(0, 0, 0.9),
      part: "/Root/WIRES",
    }),
    [newComponent(MaterialC, {shader: "Vine"})]
  );

  const light = PointLight(0xffffff, 10, new Vector3(2, 3, 3));

  world
    .addEntity(cam)
    .addEntity(env)
    .addEntity(chair)
    .addEntity(girl)
    .addEntity(light)
    .addEntity(wires);

  world
    .registerSystem(RenderSystem)
    .registerSystem(Object3DSystem)
    .registerSystem(AssetSystem)
    .registerSystem(CameraSystem)
    .registerSystem(OrbitControlsSystem)
    .registerSystem(PointLightSystem)
    .registerSystem(MaterialSystem)
    .registerSystem(CCMaterialSystem);

    world.init();
})();
