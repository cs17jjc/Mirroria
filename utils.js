function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function rgbToHexAlpha(r, g, b, a) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a);
}
function calcDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
function addVector(v1, v2) {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
}
function calcForce(distance, pmass, boimass) {
  return (0.5 * pmass * boimass) / Math.pow(distance, 2);
}
function calcAngle(ppos, boipos) {
  const deltaX = boipos.x - ppos.x;
  const deltaY = boipos.y - ppos.y;
  return Math.atan2(deltaY, deltaX);
}
function calcComponents(force, angle) {
  return { x: force * Math.cos(angle), y: force * Math.sin(angle) };
}
function copyVector(v) {
  return { x: v.x, y: v.y };
}
function angleMagVector(angle, magnitude) {
  return { x: Math.cos(angle) * magnitude, y: Math.sin(angle) * magnitude };
}
function drawRectCenter(ctx, x, y, w, h) {
  ctx.rect(x - w / 2, y - h / 2, w, h);
}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function random_item(items) {
  return items[Math.floor(Math.random() * items.length)];
}
function createParticle(pos, xvel, yvel, lifeDec) {
  return { x: pos.x, y: pos.y, xvel: xvel, yvel: yvel, life: 255, lifeDec: lifeDec };
}
function makeRect(x, y, w, h) {
  return { x: x, y: y, w: w, h: h };
}
function copyRect(r) {
  return { x: r.x, y: r.y, w: r.w, h: r.h };
}
function intersectRect(r1, r2) {
  const xIntersection = (r1.x >= r2.x && r1.x <= r2.x + r2.w) || (r2.x >= r1.x && r2.x <= r1.x + r1.w);
  const yIntersection = (r1.y >= r2.y && r1.y <= r2.y + r2.h) || (r2.y >= r1.y && r2.y <= r1.y + r1.h);
  return xIntersection && yIntersection;
}
function tweetFinished(score){      
  var left = (screen.width / 2) - (640 / 2);
            var top = (screen.height / 2) - (380 / 2);

              var shareText = encodeURIComponent("I completed Mirroria by @KiwiSoggy with " + score + " Coins! https://soggykiwi.itch.io/mirroria");
            var shareUrl = "https://twitter.com/intent/tweet?text=" + shareText;

            var popup = window.open(shareUrl, 'name', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + 640 + ', height=' + 380 +', top=' + top + ', left=' + left);
            if (window.focus && popup){
              popup.focus();
            }
}
function createBackgroundImage(levelRadius, levelHeight, tileSize) {
  var bgCanv = document.createElement('canvas');
  bgCanv.width = levelRadius * 2 * tileSize;
  bgCanv.height = levelHeight * tileSize;
  var bgCtx = bgCanv.getContext("2d");
  bgCtx.imageSmoothingEnabled = false;
  for (x = 0; x < bgCanv.width; x += tileSize) {
    for (y = 0; y < bgCanv.height; y += tileSize) {
      var choice = Math.random();
      if (choice < 0.94) {
        bgCtx.drawImage(textures.get("backgroundTile"), x, y, tileSize, tileSize);
      } else if (choice < 0.96) {
        bgCtx.drawImage(textures.get("backgroundTileB"), x, y, tileSize, tileSize);
      } else if (choice < 0.98) {
        bgCtx.drawImage(textures.get("backgroundTileC"), x, y, tileSize, tileSize);
      } else if (choice < 0.99) {
        bgCtx.drawImage(textures.get("backgroundTileD"), x, y, tileSize, tileSize);
      } else {
        bgCtx.drawImage(textures.get("backgroundTileE"), x, y, tileSize, tileSize);
      }
      bgCtx.fillStyle = rgbToHexAlpha(0, 0, 0, Math.trunc(((y / bgCanv.height) * 10)) * 25);
      bgCtx.fillRect(x, y, tileSize, tileSize);
    }
  }

  return bgCanv;
}
function canvasToImage(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
}
function makeWall(x, y, w, h, tex) {
  return { t: "WALL", r: makeRect(x, y, w, h), texture: tex };
}
function makeFloor(x, y, w, h, tex) {
  return { t: "FLOOR", r: makeRect(x, y, w, h), texture: tex };
}
function makeMirror(x, y, w, h, tex) {
  return { t: "MIRROR", r: makeRect(x, y, w, h), texture: tex };
}
function makeShop(x, y, w, h, shopNum, tex, playerSize) {
  var items;
  var prices;
  var text;
  if (shopNum == 0) {
    items = nRandomShopItems(2, ["HEALTH"], 5, 5);
    items.push(makeArmorItem());
    prices = priceItems(items);
    text = [
      { text: "Hello spirit.", side: "L" },
      { text: "Where am I?", side: "R" },
      { text: "This is a Tower of Mirroria.", side: "L" },
      { text: "How did I get here?", side: "R" },
      { text: "When you died,", side: "L" },
      { text: "your soul was captured by the slimes.", side: "L" },
      { text: "I'm dead?", side: "R" },
      { text: "Unfortunately.", side: "L" },
      { text: "But you are still bound to this world.", side: "L" },
      { text: "Your soul is divided.", side: "L" },
      { text: "The void mirror prevents each half from touching.", side: "L" },
      { text: "To leave this world you must recombine.", side: "L" },
      { text: "How do I do that?", side: "R" },
      { text: "These towers extract soul energy.", side: "L" },
      { text: "This energy is beamed to the sludgemines,", side: "L" },
      { text: "and used to produce more slimes.", side: "L" },
      { text: "The transmitter is at the top of the tower.", side: "L" },
      { text: "Destroying the transmitter is the only way,", side: "L" },
      { text: "to create a hole through the mirror.", side: "L" },
      { text: "Thank you.", side: "R" },
      { text: "We have some items that might help.", side: "L" },
      { text: "A health item restores your health when used.", side: "L" },
      { text: "An armor item replenishes one armor when used.", side: "L" },
      { text: "All damage is prevented while you have armor.", side: "L" },
      { text: "We have collected more exotic items higher up.", side: "L" },
      { text: "Do you accept Crypt-O-Currency?", side: "R" },
      { text: "Regular gold coins are fine.", side: "L" }
    ];
  } else if (shopNum == 1) {
    var weapon = makeMediumWeapon(playerSize);
    items = nRandomShopItems(2, ["HEALTH", "ARMOR"], 5, 5);
    items.push(makeHealthItem(15));
    items.push(makeSwordItem(weapon, makeSwordDesc(weapon, true)));
    prices = priceItems(items);
    text = [
      { text: "Are you the same tentacle?", side: "R" },
      { text: "We are, yes.", side: "L" },
      { text: "The sword, you should take it.", side: "L" },
      { text: "You will retain the sword if you perish.", side: "L" },
      { text: "You also retain any gold you collect.", side: "L" },
      { text: "If you cannot afford an item,", side: "L" },
      { text: "it may be worth to 'restart',", side: "L" },
      { text: "and come back with more gold.", side: "L" }
    ];
  } else if (shopNum == 2) {
    var weapon = makeMidWeapon(playerSize);
    items = nRandomShopItems(3, ["HEALTH", "ARMOR"], 10, 30);
    items.push(makeHealthBoostItem(20));
    items.push(makeSwordItem(weapon, makeSwordDesc(weapon, true)));
    prices = priceItems(items);
    text = [
      { text: "When the slimes invaded Mirroria,", side: "L" },
      { text: "the omnislime planted overseers.", side: "L" },
      { text: "Those eyes?", side: "R" },
      { text: "Yes, they track the souls in each tower.", side: "L" },
      { text: "Unknown to them,", side: "L" },
      { text: "this brickwork was ocupied.", side: "L" },
      { text: "Can they still see me?", side: "R" },
      { text: "They can,", side: "L" },
      { text: "but they only talk to me now.", side: "L" },
      { text: "However,", side: "L" },
      { text: "When you attack the transmitter,", side: "L" },
      { text: "the omnislime will be summoned.", side: "L" }];
  } else if (shopNum == 3) {
    var weapon1 = makeQuickWeapon1(playerSize);
    var weapon2 = makeHeavyWeapon1(playerSize);
    items = nRandomShopItems(2, ["HEALTH", "ARMOR", "JUMP"], 10, 30);
    items.push(makeHealthItem(20));
    items.push(makeSwordItem(weapon1, makeSwordDesc(weapon1, true)));
    items.push(makeSwordItem(weapon2, makeSwordDesc(weapon2, true)));
    prices = priceItems(items);
    text = [
      { text: "What's up with the green slimes?", side: "R" },
      { text: "Rejects from the sludgemines,", side: "L" },
      { text: "they are the uncorrupted slimes,", side: "L" },
      { text: "still bound with soul energy,", side: "L" },
      { text: "they're left here to be 'recycled'.", side: "L" }];
  } else if (shopNum == 4) {
    var weapon1 = makeQuickWeapon2(playerSize);
    var weapon2 = makeHeavyWeapon2(playerSize);
    items = nRandomShopItems(2, ["HEALTH", "ARMOR", "JUMP"], 10, 30);
    items.push(makeHealthItem(20));
    items.push(makeSwordItem(weapon1, makeSwordDesc(weapon1, true)));
    items.push(makeSwordItem(weapon2, makeSwordDesc(weapon2, true)));
    prices = priceItems(items);
    text = [
      { text: "After the war with your kind,", side: "L" },
      { text: "the Slimehive built these towers,", side: "L" },
      { text: "to rebuild their armies,", side: "L" },
      { text: "from captured warrior's souls.", side: "L" },
      { text: "Were those their weapons?", side: "R" },
      { text: "Yes, two of the most powerful.", side: "L" },
      { text: "Both fell to the omnislime.", side: "L" },
      { text: "It feeds directly from the transmitter,", side: "L" },
      { text: "and sheilds it from damage.", side: "L" },
      { text: "How do I kill it?", side: "R" },
      { text: "You can't,", side: "L" },
      { text: "but you can stun it for long enough,", side: "L" },
      { text: "to attack the transmitter.", side: "L" }];
  } else if (shopNum == 5) {
    items = nRandomShopItems(3, ["HEALTH", "ARMOR", "HEALTHBOOST", "JUMP"], 20, 30);
    items.push(makeHealthItem(50));
    items.push(makeHealthBoostItem(20));
    prices = priceItems(items);
    text = [
      { text: "This is our last chance to talk.", side: "L" },
      { text: "I appriciate your help.", side: "R" },
      { text: "I hope you find peace.", side: "L" },
      { text: "What will you do afterwards?.", side: "R" },
      { text: "With the omnislime gone,", side: "L" },
      { text: "I can leave this cursed tower,", side: "L" },
      { text: "and search for other survivors.", side: "L" },
      { text: "Poggers.", side: "R" }];
  }

  return { t: "SHOP", shopNum: shopNum, r: makeRect(x, y, w, h), texture: tex, items: items, prices: prices, text: text, beenEntered: false };
}
function makeEnenmy(x, y, type, data) {
  return { t: "ENEMY", x: x, y: y, type: type, isDead: false, data: data };
}
function makeSlime(x, y, vx, type, hp, dmg, s, hs, recov) {
  return makeEnenmy(x, y, "SLIME", { type: type, vx: vx, vy: 0, s: s, hp: hp, dmg: dmg, hitTimer: 0, hitspeed: hs, lastHit: 0, recov: recov })
}
function makeTransmitter(x, y, w, h, maxHp, tex) {
  return { t: "TRANSMITTER", r: makeRect(x, y, w, h), texture: tex, maxHp: maxHp, hp: maxHp, lastHit: 0 };
}
function makeCoin(x, y, vx, vy) {
  return { t: "COIN", vx: vx, vy: vy, texture: "coin1", r: makeRect(x, y, 8, 8), collected: false };
}
function makeAnimation(x, y, w, h, tex, lifetime, frames) {
  return { t: "ANIM", r: makeRect(x, y, w, h), frames: frames, texture: tex, lifetime: lifetime, created: Date.now() };
}
function getNextCoinFrame(frame) {
  switch (frame) {
    case "coin1":
      return "coin2";
    case "coin2":
      return "coin3";
    case "coin3":
      return "coin4";
    case "coin4":
      return "coin5";
    case "coin5":
      return "coin6";
    case "coin6":
      return "coin1";
  }
}
function getNextShopFrame(frame) {
  switch (frame) {
    case "shop1":
      return "shop2";
    case "shop2":
      return "shop3";
    case "shop3":
      return "shop4";
    case "shop4":
      return "shop5";
    case "shop5":
      return "shop6";
    case "shop6":
      return "shop7";
    case "shop7":
      return "shop1";
  }
}
function countFloors(map, x, y, size) {
  if (y < 0 || y > map[0].length - 1) {
    return 0;
  }
  var count = 0;
  for (var xx = Math.max(0, x - size); xx <= Math.min(map.length - 1, x + size); xx++) {
    if (map[xx][y] == "FLOOR") {
      count += 1;
    }
  }
  return count;
}
function generateMap(height, levelRadius, tileSize, playerSize) {
  var tileMapLeft = [];
  var tileMapRight = [];
  for (var i = 0; i < levelRadius; i++) {
    tileMapLeft.push(["FLOOR"]);
    tileMapRight.push(["FLOOR"]);
  }
  for (var y = 1; y < height; y++) {
    for (var x = 0; x < levelRadius; x++) {
      if (y == height - 1) {
        tileMapLeft[x].push("FLOOR");
        tileMapRight[x].push("FLOOR");
      } else {
        switch (x) {
          case 0:
            tileMapLeft[x].push("WALL");
            if (y <= 6 && y >= 4) {
              tileMapRight[x].push("EMPTY");
            } else {
              tileMapRight[x].push("MIRRORRIGHT");
            }
            break;
          case levelRadius - 1:
            tileMapRight[x].push("WALL");
            if (y <= 6 && y >= 4) {
              tileMapLeft[x].push("EMPTY");
            } else {
              tileMapLeft[x].push("MIRRORLEFT");
            }
            break;

          default:
            if (y == height - 2 && [2, 4, 6].includes(x)) {
              tileMapLeft[x].push("SlIME");
              tileMapRight[x].push("SLIME");
            } else {
              tileMapLeft[x].push("EMPTY");
              tileMapRight[x].push("EMPTY");
            }
        }
      }
    }
  }

  tileMapRight[levelRadius - 2][height - 3] = "FLOOR";
  tileMapRight[levelRadius - 3][height - 3] = "FLOOR";
  tileMapLeft[levelRadius - 5][height - 5] = "FLOOR";
  tileMapLeft[levelRadius - 6][height - 5] = "FLOOR";
  tileMapLeft[levelRadius - 7][height - 5] = "FLOOR";

  var slimeCooldown = 0;
  for (var i = 0; i < 1; i++) {
    for (var y = height - 8; y >= 5; y -= 3) {
      for (var x = 1; x < levelRadius - 1; x++) {

        var floorsLeft = countFloors(tileMapLeft, x, y + 3, 1);
        var floorsRight = countFloors(tileMapRight, x, y + 3, 1);

        if (floorsLeft + floorsRight >= 1) {
          tileMapLeft[x][y] == "EMPTY";
          tileMapRight[x][y] == "EMPTY";
        } else {
          if (floorsLeft + floorsRight == 0) {
            if (tileMapLeft[x - 1][y] == "FLOOR") {
              tileMapLeft[x][y] = "FLOOR";
            } else if (tileMapRight[x - 1][y] == "FLOOR") {
              tileMapRight[x][y] = "FLOOR";
            } else {
              if (Math.random() > 0.5) {
                tileMapLeft[x][y] = "FLOOR";
              } else {
                tileMapRight[x][y] = "FLOOR";
              }
            }
          }

          if (countFloors(tileMapLeft, x - 1, y, 1) == 2 && countFloors(tileMapLeft, x + 1, y + 3, 1) == 3) {
            tileMapLeft[x][y] = "FLOOR";
            tileMapLeft[x][y + 3] = "EMPTY";
            tileMapRight[x][y + 3] = "EMPTY";
          }
          if (countFloors(tileMapRight, x - 1, y, 1) == 2 && countFloors(tileMapRight, x + 1, y + 3, 1) == 3) {
            tileMapRight[x][y] = "FLOOR";
            tileMapLeft[x][y + 3] = "EMPTY";
            tileMapRight[x][y + 3] = "EMPTY";
          }

          if (floorsLeft > 1) {
            tileMapRight[x][y] = "EMPTY";
          } else if (floorsRight > 1) {
            tileMapLeft[x][y] = "EMPTY";
          }

          if ((y > 10 && Math.random() > 0.3 && slimeCooldown == 0)) {
            if (tileMapLeft[x][y] == "FLOOR") {
              tileMapLeft[x][y - 1] = "SLIME";
              slimeCooldown = levelRadius - 5;
            } else if (tileMapRight[x][y] == "FLOOR") {
              tileMapRight[x][y - 1] = "SLIME";
              slimeCooldown = levelRadius - 5;
            }
          }
        }

        slimeCooldown = Math.max(0, slimeCooldown - 1);
      }
    }
  }

  var shopCooldown = 20;
  var shopCounter = 0;
  var tileMap = new Map();
  for (var y = height - 1; y >= 0; y--) {
    shopCooldown += 1;
    var rowTiles = [];
    for (var x = 0; x < levelRadius; x++) {
      rowTiles.push(tileMapLeft[x][y]);
    }
    for (var x = 0; x < levelRadius; x++) {
      rowTiles.push(tileMapRight[x][y]);
    }
    var row = [];
    for (var x = 0; x < rowTiles.length; x++) {
      switch (rowTiles[x]) {
        case "FLOOR":
          if (rowTiles[x - 1] != "FLOOR") {
            row.push(makeFloor(x * tileSize, y * tileSize, tileSize, tileSize, "floorLeft"));
          } else if (rowTiles[x + 1] != "FLOOR") {
            row.push(makeFloor(x * tileSize, y * tileSize, tileSize, tileSize, "floorRight"));
          } else {

            if (shopCooldown >= (25 - (y < 20 && y > 15 ? 20 : 0))) {
              shopCooldown = 0;
              row.push(makeFloor(x * tileSize, y * tileSize, tileSize, tileSize, "floorMiddleShop"));
              row.push(makeShop(x * tileSize, (y - 1) * tileSize, tileSize, tileSize, shopCounter, "shop1", playerSize));
              shopCounter += 1;
            } else {
              row.push(makeFloor(x * tileSize, y * tileSize, tileSize, tileSize, "floorMiddle"));
            }
          }
          break;
        case "WALL":
          if (x == 0) {
            row.push(makeWall(x * tileSize, y * tileSize, tileSize, tileSize, "wallLeft"));
          } else if (x == (levelRadius * 2) - 1) {
            if (Math.random() > 0.1) {
              row.push(makeWall(x * tileSize, y * tileSize, tileSize, tileSize, "wallRight"));
            } else {
              row.push(makeWall(x * tileSize, y * tileSize, tileSize, tileSize, "wallRightB1"));
            }

          }
          break;
        case "MIRRORLEFT":
          row.push(makeMirror(x * tileSize, y * tileSize, tileSize, tileSize, "mirrorLeft"));
          break;
        case "MIRRORRIGHT":
          row.push(makeMirror(x * tileSize, y * tileSize, tileSize, tileSize, "mirrorRight"));
          break;
        case "SLIME":
          var section = Math.trunc(y / 22);
          //I've been working on this game jam for days, please dont judge me on this.
          if (tileMap.get(y + 1).filter(o => o.t == "SHOP").length >= 1) {
            section = 9999999;
          }
          switch (section) {
            case 6:
              if (Math.random() > 0.8) {
                row.push(makeSlime(x * tileSize, y * tileSize, 1, "small", 6, 0, tileSize * 0.8, 5000, 600));
              } else {
                row.push(makeSlime(x * tileSize, y * tileSize, 1, "small", 2, 0, tileSize * 0.6, 5000, 600));
              }
              break;
            case 5:
              if (Math.random() > 0.7) {
                row.push(makeSlime(x * tileSize, y * tileSize, 1, "small", 2, 0, tileSize * 0.6, 5000, 600));
              } else {
                row.push(makeSlime(x * tileSize, y * tileSize, 2, "medium", 4, 5, tileSize * 0.6, 900, 300));
              }
              break;
            case 4:
              if (Math.random() > 0.5) {
                row.push(makeSlime(x * tileSize, y * tileSize, 2, "medium", 15, 20, tileSize * 0.8, 500, 300));
              } else {
                row.push(makeSlime(x * tileSize, y * tileSize, 2, "medium", 4, 15, tileSize * 0.6, 500, 300));
              }
              break;
            case 3:
              if (Math.random() > 0.5) {
                row.push(makeSlime(x * tileSize, y * tileSize, 2, "medium", 15, 20, tileSize * 0.8, 500, 300));
              } else {
                row.push(makeSlime(x * tileSize, y * tileSize, 2, "medium", 4, 15, tileSize * 0.6, 500, 300));
              }
              break;
            case 2:
              if (Math.random() > 0.5) {
                row.push(makeSlime(x * tileSize, y * tileSize, 2, "medium", 15, 20, tileSize * 0.8, 500, 300));
              } else {
                row.push(makeSlime(x * tileSize, y * tileSize, 2.5, "large", 30, 20, tileSize, 500, 100));
              }
              break;
            case 1:
              if (Math.random() > 0.5) {
                row.push(makeSlime(x * tileSize, y * tileSize, 2, "medium", 15, 20, tileSize * 0.8, 500, 200));
              } else {
                row.push(makeSlime(x * tileSize, y * tileSize, 2.5, "large", 30, 20, tileSize * 0.6, 400, 200));
              }
              break;
            case 0:
              if (Math.random() > 0.2) {
                row.push(makeSlime(x * tileSize, y * tileSize, 2.5, "large", 50, 20, tileSize * 0.8, 400, 200));
              } else {
                row.push(makeSlime(x * tileSize, y * tileSize, 2.5, "large", 40, 20, tileSize * 0.6, 500, 150));
              }
              break;
          }
          break;
      }
    }
    if (y == 4) {
      row.push(makeTransmitter((levelRadius - 1) * tileSize, 4 * tileSize, tileSize * 2, tileSize * 3, 300, "TB1"));
    }
    tileMap.set(y, row);
  }
  return tileMap;
}
function makeMeleeWeapon(name, dmg, rate, texture, hitAreaEast, hitAreaWest) {
  return { t: "MELEE", name: name, d: dmg, rate: rate, texture: texture, he: hitAreaEast, hw: hitAreaWest };
}

function makeStartWeapon(playerSize) {
  var texture = "sword0";
  return makeMeleeWeapon("Iron Dagger", 2, 800, texture,
    makeRect(playerSize.w, 0, textures.get(texture).height, playerSize.h + 10),
    makeRect(-1 * textures.get(texture).height, -10, textures.get(texture).height, playerSize.h + 10));
}
function makeMediumWeapon(playerSize) {
  var texture = "sword1";
  return makeMeleeWeapon("Iron Sword", 6, 800, texture,
    makeRect(playerSize.w, -10, textures.get(texture).height, playerSize.h + 10),
    makeRect(-1 * textures.get(texture).height, -10, textures.get(texture).height, playerSize.h + 10));
}
function makeMidWeapon(playerSize) {
  var texture = "sword5";
  return makeMeleeWeapon("Steel Sword", 8, 500, texture,
    makeRect(playerSize.w, -10, textures.get(texture).height, playerSize.h + 10),
    makeRect(-1 * textures.get(texture).height, -10, textures.get(texture).height, playerSize.h + 10));
}
function makeQuickWeapon1(playerSize) {
  var texture = "sword6";
  return makeMeleeWeapon("Diamond Sword", 8, 250, texture,
    makeRect(playerSize.w, -10, textures.get(texture).height, playerSize.h + 10),
    makeRect(-1 * textures.get(texture).height, -10, textures.get(texture).height, playerSize.h + 10));
}
function makeHeavyWeapon1(playerSize) {
  var texture = "sword3";
  return makeMeleeWeapon("Sapphire Sword", 16, 500, texture,
    makeRect(playerSize.w, -10, textures.get(texture).height, playerSize.h + 10),
    makeRect(-1 * textures.get(texture).height, -10, textures.get(texture).height, playerSize.h + 10));
}
function makeQuickWeapon2(playerSize) {
  var texture = "sword2";
  return makeMeleeWeapon("TentaBlade", 8, 100, texture,
    makeRect(playerSize.w, -10, textures.get(texture).height, playerSize.h + 10),
    makeRect(-1 * textures.get(texture).height, -10, textures.get(texture).height, playerSize.h + 10));
}
function makeHeavyWeapon2(playerSize) {
  var texture = "sword4";
  return makeMeleeWeapon("BFG 100", 30, 500, texture,
    makeRect(playerSize.w, -10, textures.get(texture).height, playerSize.h),
    makeRect(-1 * textures.get(texture).height, 0, textures.get(texture).height, playerSize.h));
}

function makeHealthItem(strength) {
  return { type: "HEALTH", value: strength, texture: "item1", desc: "+" + strength + " HP" }
}
function makeHealthBoostItem(strength) {
  return { type: "HEALTHBOOST", value: strength, texture: "item2", desc: "+" + strength + " Max HP" }
}
function makeArmorItem() {
  return { type: "ARMOR", texture: "item3", desc: "+1 Armor" }
}
function makeEffectItem(effectType, strength, duration) {
  return { type: "EFFECT", effectType: effectType, strength: strength, duration: duration };
}
function makeJumpItem() {
  return { type: "JUMP", texture: "item4", desc: "Jump" };
}
function makeSwordItem(sword, desc) {
  return { type: "SWORD", texture: sword.texture, desc: desc, sword: sword }
}
function makeSwordDesc(sword, name) {
  return (name ? sword.name + " with " : "") + sword.d + " dmg and " + sword.rate + " cooldown."
}
function randomShopItem(pool, minStrength, range) {
  switch (random_item(pool)) {
    case "HEALTH":
      return makeHealthItem(minStrength + Math.trunc(Math.random() * range));
    case "HEALTHBOOST":
      return makeHealthBoostItem(minStrength + Math.trunc(Math.random() * range))
    case "ARMOR":
      return makeArmorItem();
    case "JUMP":
      return makeJumpItem();
  }
}
function nRandomShopItems(n, pool, min, range) {
  var items = [];
  while (items.length < n) {
    items.push(randomShopItem(pool, min, range));
  }
  return items;
}
function priceItems(items) {
  return items.map(i => {
    switch (i.type) {
      case "HEALTH":
        return 2 + Math.trunc(i.value / 8);
      case "HEALTHBOOST":
        return 20 + Math.trunc(i.value / 10);
      case "JUMP":
        return 10;
      case "ARMOR":
        return 12;
      case "SWORD":
        return Math.trunc((i.sword.d / i.sword.rate) * 1000);
    }
  });
}

function useItem(item, gState) {
  switch (item.type) {
    case "HEALTH":
      gState.playerHealth = Math.min(gState.maxHealth, gState.playerHealth + item.value);
      break;
    case "HEALTHBOOST":
      gState.maxHealth += item.value;
      gState.playerHealth = gState.maxHealth;
      break;
    case "ARMOR":
      gState.playerArmor += 1;
      break;
    case "JUMP":
      gState.playerVelocity.y = -12;
      gState.jumpTimer = Date.now();
      gState.hasLanded = false;
      break;
  }
}

function canUse(item, gState) {
  switch (item.type) {
    case "HEALTH":
      return gState.playerHealth != gState.maxHealth;
    case "HEALTHBOOST":
      return gState.maxHealth < 300;
    case "ARMOR":
      return gState.playerArmor < gState.maxArmor;
    default:
      return Date.now() - gState.jumpTimer > 500;
  }
}
