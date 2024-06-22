# NFT Project

NFT通过一个TokenId对应一个URI来确保资产的唯一性
TokenId和playerAddress是一对一的关系

ERC721合约交易

初始化合约时，会触发一次Transfer事件，会把最新的tokenId 和 player emit出来，后台及时监控到这个事件把内容存入数据库
contract.on('Transfer', (_, playerAddress, tokenId: BigNumber) => {
    console.log(playerAddress, tokenId.toNumber(), 'transfer')
})

这个URI保存的地址的内容会变怎么办？

用ipfs保证资源不可变

比如URI：
![](https://ipfs.filebase.io/ipfs/QmTz6ajnLUXwaXCjZ7Zvdk2nXGdQNspnLPsgwZFDP45tUJ/ghost.json)

其对应的图片内容如下
![](https://ipfs.filebase.io/ipfs/QmUeeVBV6ZiKgQSGLjDDtUdkbCcYXbTAkuApEeJeun1rL7)

由此，我们用HeroFactory可以做个自己的NFT

tokenURI format

Mage:
```json
{
    "name": "Mage",
    "description": "Mages wield powerful magic, casting spells like fireballs and shields to attack and protect.",
    "image": "xxx",
    "strength": "18",
    "health": "18",
    "dexterity": "18",
    "intellect": "18",
    "magic": "18",
}
```

Healer
```json
{
    "name": "Healer",
    "description": "Healers specialize in mending wounds and restoring vitality, crucial in supporting allies during battles with their mending spells and protective charms.",
    "image": "xxx",
    "strength": "18",
    "health": "18",
    "dexterity": "18",
    "intellect": "18",
    "magic": "18",
}
```

Barbarians
```json
{
    "name": "Barbarians",
    "description": "Barbarians thrive in combat, wielding raw strength and ferocity to overwhelm foes. They excel in close-quarters combat, relying on brute force and primal instincts to dominate the battlefield.",
    "image": "xxx",
    "strength": "18",
    "health": "18",
    "dexterity": "18",
    "intellect": "18",
    "magic": "18",
}
```

# ERC20
