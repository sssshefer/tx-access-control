import { loadFixture, ethers, expect } from "./setup";
import type { Demo } from "../typechain-types";

describe("AccessControl", function () {
    async function deploy() {
        const [superAdmin, withdrawer, minter, user] = await ethers.getSigners();

        const Factory = await ethers.getContractFactory("Demo", superAdmin);
        const demo: Demo = await Factory.deploy(withdrawer, minter);
        await demo.waitForDeployment();

        const defaultAdminRole = await demo.DEFAULT_ADMIN_ROLE();
        const withdrawerRole = await demo.WITHDRAWER_ROLE();
        const minterRole = await demo.MINTER_ROLE();

        return { superAdmin, withdrawer, minter, user, demo, defaultAdminRole, withdrawerRole, minterRole }
    }

    it("Deploy test", async function () {
        const { superAdmin, withdrawer, minter, user, demo, defaultAdminRole, withdrawerRole, minterRole } = await loadFixture(deploy);

        expect(await demo.getRoleAdmin(withdrawerRole)).to.eq(defaultAdminRole);
        expect(await demo.getRoleAdmin(minterRole)).to.eq(withdrawerRole);
    });

    it("Initial allowance test", async function () {
        const { superAdmin, withdrawer, minter, user, demo, defaultAdminRole, withdrawerRole, minterRole } = await loadFixture(deploy);

        await demo.connect(withdrawer).withdraw();

        await expect(demo.withdraw()).to.be.revertedWith("No such role!");
        await expect(demo.connect(withdrawer).pause()).to.be.revertedWith("No such role!");
    });

    it("Granting permission to user and minting tokens", async function () {
        const { superAdmin, withdrawer, minter, user, demo, defaultAdminRole, withdrawerRole, minterRole } = await loadFixture(deploy);

        await expect(demo.connect(user).mint()).to.be.revertedWith("No such role!");
        await expect(await demo.mintedTokens()).to.eq(0);

        await expect(demo.connect(withdrawer).grantRole(minterRole, user)).to.emit(demo, "RoleGranted")
        await demo.connect(user).mint();
        await expect(await demo.mintedTokens()).to.eq(1);
    });
})