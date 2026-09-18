import { type UppyOptions as UppyCoreOptions } from "@uppy/core";

import { type UppyBody } from "./UppyBody";
import { type UppyMeta } from "./UppyMeta";

type NonOptionalUppyOptions = UppyCoreOptions<UppyMeta, UppyBody>;

// restrictions are non-optional in UppyOptions. They are not required to be passed to our components
type UppyOptions = Omit<NonOptionalUppyOptions, "restrictions"> & {
    restrictions?: Partial<NonOptionalUppyOptions["restrictions"]>;
};

export { type UppyOptions };
