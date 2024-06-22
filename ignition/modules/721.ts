import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const erc721Module = buildModule("ERC721Module", (m) => {
  // const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  // const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

  const token = m.contract("GameItem");

  return { token };
});

export default erc721Module;
