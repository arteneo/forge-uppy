import { type UploadResult } from "@uppy/core";
import { type UppyBody } from "./UppyBody";
import { type UppyMeta } from "./UppyMeta";

type UppyUploadResult = UploadResult<UppyMeta, UppyBody>;

export { type UppyUploadResult };
