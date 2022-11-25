require('@nomicfoundation/hardhat-toolbox')
const { expect } = require('chai')

describe('The ERC1155 contract', function () {

  const MINTER_ROLE = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
  const PAUSER_ROLE = '0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a'
  const idMaxSupply = 100
  const emptyBytes = 0

  let deployer, alice, bob, badActor
  let token, tokenId1 = 1

  beforeEach(async () => {
    [deployer, alice, bob, badActor] = await ethers.getSigners()

    const Factory = await ethers.getContractFactory('MyERC1155')
    const factory = await Factory.deploy(idMaxSupply)

    token = await factory.deployed()
  })

  describe('when minting', () => {

    it('should fail if sender is not a MINTER', async () => {
      await expect(
        token.connect(badActor).mint(badActor.address, tokenId1, 10, emptyBytes)
      ).to.be.revertedWith(`AccessControl: account ${badActor.address.toLowerCase()} is missing role ${MINTER_ROLE}`)
    })

    it('should fail if cap is exceeded', async () => {
      await expect(
        token.connect(deployer).mint(alice.address, tokenId1, 101, emptyBytes)
      ).to.be.revertedWith('Max supply reached')
    })

    it('should correctly mint tokens to user', async () => {
      await token.connect(deployer).mint(alice.address, tokenId1, 100, emptyBytes)

      expect(await token.balanceOf(alice.address, tokenId1)).to.eq(100)
      expect(await token.totalSupply(tokenId1)).to.eq(100)
    })

  })

  describe('when minting batches', () => {

    const ids = [1, 2]
    let amounts

    beforeEach(() => {
      amounts = [10, 20]
    })

    it('should fail if sender is not a MINTER', async () => {
      await expect(
        token.connect(badActor).mintBatch(badActor.address, ids, amounts, emptyBytes)
      ).to.be.revertedWith(`AccessControl: account ${badActor.address.toLowerCase()} is missing role ${MINTER_ROLE}`)
    })

    it('should fail if cap is exceeded', async () => {
      amounts[1] = 101

      await expect(
        token.connect(deployer).mintBatch(alice.address, ids, amounts, emptyBytes)
      ).to.be.revertedWith('Max supply reached')
    })

    it('should correctly mint tokens to user', async () => {
      await token.connect(deployer).mintBatch(alice.address, ids, amounts, emptyBytes)

      ids.forEach(async (id, idx) => {
        expect(await token.balanceOf(alice.address, id)).to.eq(amounts[idx])
        expect(await token.totalSupply(id)).to.eq(amounts[idx])
      })

    })

  })

  describe('when managing pause cicle', () => {

    it('should fail if sender is not a PAUSER', async () => {
      await expect(
        token.connect(badActor).pause()
      ).to.be.revertedWith(`AccessControl: account ${badActor.address.toLowerCase()} is missing role ${PAUSER_ROLE}`)
    })

    it('should correctly suspend token transactions', async () => {
      await token.connect(deployer).mint(alice.address, tokenId1, 10, emptyBytes)

      await token.connect(deployer).pause()

      await expect(
        token.connect(deployer).mint(alice.address, tokenId1, 1, emptyBytes)
      ).to.be.revertedWith('Pausable: paused')

      await expect(
        token.connect(alice).safeTransferFrom(
          alice.address,
          bob.address,
          tokenId1,
          1,
          emptyBytes
        )
      ).to.be.revertedWith('Pausable: paused')
    })

    it('should correctly resume token transactions', async () => {
      await token.connect(deployer).mint(alice.address, tokenId1, 10, emptyBytes)

      await token.connect(deployer).pause()

      await expect(
        token.connect(alice).safeTransferFrom(
          alice.address,
          bob.address,
          tokenId1,
          1,
          emptyBytes
        )
      ).to.be.revertedWith('Pausable: paused')

      await token.connect(deployer).unpause()

      await token.connect(alice).safeTransferFrom(
        alice.address,
        bob.address,
        tokenId1,
        1,
        emptyBytes
      )

      expect(await token.balanceOf(bob.address, tokenId1)).to.eq(1)
    })

  })

});
