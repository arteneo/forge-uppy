import { type TusOptions as UppyTusOptions } from "@uppy/tus";
import { type UppyBody } from "./UppyBody";
import { type UppyMeta } from "./UppyMeta";

type TusOptions = UppyTusOptions<UppyMeta, UppyBody>;

export { type TusOptions };
