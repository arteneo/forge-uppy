// Decided not to use Body from @uppy/core as it is not compatible with UppyContextProvider
// There might be a better option, but it is not worth investigating right now
type UppyBody = Record<string, never>;

export { type UppyBody };
