import { type UppyOptions as UppyCoreOptions } from "@uppy/core";
import { type UppyBody } from "./UppyBody";
import { type UppyMeta } from "./UppyMeta";

type UppyOptions = UppyCoreOptions<UppyMeta, UppyBody>;

export { type UppyOptions };
