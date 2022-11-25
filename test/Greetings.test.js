require('@nomicfoundation/hardhat-toolbox')
const { expect } = require('chai')

describe('The greetings contract', function () {

  let deployer
  let greeter

  beforeEach(async () => {
    [deployer, user, badActor] = await ethers.getSigners()

    const Factory = await ethers.getContractFactory('Greeter')
    const factory = await Factory.deploy('Hello, ')

    greeter = await factory.deployed()
  })

  describe('when calling the greeter fn', () => {

    it('should correctly return the greeting', async () => {
      const greetings = await greeter.greet('human')

      expect(greetings).to.eql('Hello, human!')
    })

    it('should fail if update is called without a payment', async () => {
      await expect(
        greeter.updateGreeting('Hi, ')
      ).to.be.revertedWith(
        'You should pay at least 1 ETH to update the greeting'
      )

      const greetings = await greeter.greet('Chuck Norris')

      expect(greetings).to.eql('Hello, Chuck Norris!')
    })

    it('should correctly update the greeting', async () => {
      const oneEther = ethers.utils.parseEther('1')
      const previousOwnerBalance = await ethers.provider.getBalance(deployer.address)

      await expect(
        greeter.connect(user).updateGreeting('Hi, ', { value: oneEther })
      ).to.changeEtherBalance(user, `-${oneEther}`)

      expect(await ethers.provider.getBalance(greeter.address)).to.eq(0)

      expect(await ethers.provider.getBalance(deployer.address)).to.eq(
        previousOwnerBalance.add(oneEther)
      )

      const greetings = await greeter.greet('Chuck Norris')

      expect(greetings).to.eql('Hi, Chuck Norris!')
    })

  })

});
