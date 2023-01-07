import { Weapon, MythicalWeaponStore } from "../mythical_weapon";

const store = new MythicalWeaponStore();
describe("Mythical Weapon Model", () => {
  it("It should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("Index method should return a list of product", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
