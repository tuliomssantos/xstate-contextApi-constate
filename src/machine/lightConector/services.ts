import { energize220v } from "../../services";
import { LightConectorContext, Select_Lamp } from "../../types/lightConector";

export const services = {
  enerzigeLamp: (_: LightConectorContext, { voltage }: Select_Lamp) =>
    energize220v(voltage),
};
