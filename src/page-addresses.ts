/** The address of the first page of a site. */
const HOME_PAGE_ADDRESS = "/";

/**
 * The parameter of `[...page]` that renders the page at an address: none for the first page, `menu`
 * for the page at /menu.
 */
export function pageParameterOf(address: string): string | undefined {
  if (address === HOME_PAGE_ADDRESS) return undefined;
  return address.slice(HOME_PAGE_ADDRESS.length);
}
