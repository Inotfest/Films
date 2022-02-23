import { variables } from "./variables";

export default function trimmingAnArray(arr) {
    return arr.slice(variables.initialValue, variables.amountOfElements);
}
