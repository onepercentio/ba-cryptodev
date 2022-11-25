require('@nomicfoundation/hardhat-toolbox')
const { expect } = require('chai')

describe('The ERC721 contract', function () {

  const MINTER_ROLE = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
  const PAUSER_ROLE = '0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a'

  let deployer, alice, bob, badActor
  let token

  beforeEach(async () => {
    [deployer, alice, bob, badActor] = await ethers.getSigners()
  })

  describe('when minting', () => {

    const cap = 1

    beforeEach(async () => {
      [deployer, alice, bob, badActor] = await ethers.getSigners()

      const Factory = await ethers.getContractFactory('MyERC721')
      const factory = await Factory.deploy(cap)

      token = await factory.deployed()
    })

    it('should fail if sender is not a MINTER', async () => {
      await expect(
        token.connect(badActor).safeMint(badActor.address)
      ).to.be.revertedWith(`AccessControl: account ${badActor.address.toLowerCase()} is missing role ${MINTER_ROLE}`)
    })

    it('should fail if cap is exceeded', async () => {
      await token.connect(deployer).safeMint(alice.address)

      await expect(
        token.connect(deployer).safeMint(alice.address)
      ).to.be.revertedWith('Exceeds cap')
    })

    it('should correctly mint tokens to user', async () => {
      await token.connect(deployer).safeMint(alice.address)

      expect(await token.balanceOf(alice.address)).to.eq(1)
      expect(await token.totalSupply()).to.eq(1)
    })

  })

  describe('when managing pause cicle', () => {

    const cap = 10

    beforeEach(async () => {
      const Factory = await ethers.getContractFactory('MyERC721')
      const factory = await Factory.deploy(cap)

      token = await factory.deployed()
    })

    it('should fail if sender is not a PAUSER', async () => {
      await expect(
        token.connect(badActor).pause()
      ).to.be.revertedWith(`AccessControl: account ${badActor.address.toLowerCase()} is missing role ${PAUSER_ROLE}`)
    })

    it('should correctly suspend token transactions', async () => {
      await token.connect(deployer).safeMint(alice.address)

      await token.connect(deployer).pause()

      await expect(
        token.connect(deployer).safeMint(alice.address)
      ).to.be.revertedWith('Pausable: paused')

      await expect(
        token.connect(alice).transferFrom(alice.address, bob.address, 0)
      ).to.be.revertedWith('Pausable: paused')
    })

    it('should correctly resume token transactions', async () => {
      await token.connect(deployer).safeMint(alice.address)

      await token.connect(deployer).pause()

      await expect(
        token.connect(alice).transferFrom(alice.address, bob.address, 0)
      ).to.be.revertedWith('Pausable: paused')

      await token.connect(deployer).unpause()

      await token.connect(alice).transferFrom(alice.address, bob.address, 0)

      expect(await token.balanceOf(bob.address)).to.eq(1)
    })

  })

});
