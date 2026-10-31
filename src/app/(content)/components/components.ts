// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

// ------------------------------------------------
// TYPES
// ------------------------------------------------

interface RegistryParent {
  parent: string;
  description?: string;
  children: string[];
}

type RegistryItem = string | RegistryParent;

// ------------------------------------------------
// ITEMS
// ------------------------------------------------

export const componentRegistry: RegistryItem[] = ["Button", "Collapsible"];
