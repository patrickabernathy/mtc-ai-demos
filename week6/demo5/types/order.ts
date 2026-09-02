// The whole form as one shape. Every card reads from it and writes back to it,
// so this file is the contract they all agree on.
export type Order = {
  name: string;
  email: string;
  phone: string;
  pickup: string;
};

export const pickupTimes = ["7:30 am", "8:00 am", "8:30 am", "9:00 am", "9:30 am"];

export const emptyOrder: Order = {
  name: "",
  email: "",
  phone: "",
  pickup: "",
};
