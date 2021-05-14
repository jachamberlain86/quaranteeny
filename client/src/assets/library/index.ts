import blank from './blank.png';
import { bathImgs } from './bathroom/index';
import { bedImgs } from './bedroom/index';
import { diningImgs } from './diningRoom/index';
import { doorImgs } from './doors/index';
import { floorImgs } from './floor/index';
import { kitchenImgs } from './kitchen/index';
import { livingImgs } from './livingRoom/index';
import { officeImgs } from './office/index';
import { wallImgs } from './walls/index';

export class ImageDirectory {
  [key: string]: string;

  constructor() {
    this.blk = blank;
    this.rtl = wallImgs.rimTL;
    this.rt = wallImgs.rimT;
    this.rtr = wallImgs.rimTR;
    this.rl = wallImgs.rimL;
    this.rr = wallImgs.rimR;
    this.rbl = wallImgs.rimBL;
    this.rb = wallImgs.rimB;
    this.rbr = wallImgs.rimBR;
    this.wtl = wallImgs.wallTL;
    this.wt = wallImgs.wallT;
    this.wtr = wallImgs.wallTR;
    this.wl = wallImgs.wallL;
    this.wm = wallImgs.wallM;
    this.wr = wallImgs.wallR;
    this.wbl = wallImgs.wallBL;
    this.wb = wallImgs.wallB;
    this.wbr = wallImgs.wallBR;
    this.dtc = wallImgs.wallDoorTC;
    this.dtrc = wallImgs.wallDoorTRC;
    this.dbrc = wallImgs.wallDoorBRC;
    this.dtt = wallImgs.wallDoorTT;
    this.dtrt = wallImgs.wallDoorTRT;
    this.dbrt = wallImgs.wallDoorBRT;

    this.ctl = floorImgs.carpetTL;
    this.ct = floorImgs.carpetT;
    this.ctr = floorImgs.carpetTR;
    this.cl = floorImgs.carpetL;
    this.cm = floorImgs.carpetM;
    this.cr = floorImgs.carpetR;
    this.cdr = floorImgs.carpetDoorR;
    this.ti = floorImgs.tile;

    this.babo = bathImgs.bathO;
    this.basc = bathImgs.sinkC;
    this.bad = bathImgs.ducks;

    this.bebm = bedImgs.bedMade;
    this.bedc = bedImgs.dresserC;
    this.bep = bedImgs.poster;

    this.dic = diningImgs.chair;
    this.dit = diningImgs.table;

    this.doc = doorImgs.doorC;
    this.doo = doorImgs.doorO;

    this.kifc = kitchenImgs.fridgeC;
    this.kic1c = kitchenImgs.cab1C;
    this.kic2c = kitchenImgs.cab2C;
    this.kisc = kitchenImgs.sinkC;
    this.kiooff = kitchenImgs.ovenOff;
    this.kiu = kitchenImgs.utensils;

    this.lrbo = livingImgs.bookcase;
    this.lrjb = livingImgs.jukeboxOff;
    this.lrl = livingImgs.lamp;
    this.lrpa = livingImgs.plantAlive;
    this.lrs = livingImgs.sofa;
    this.lrtvoff = livingImgs.tvOff;

    this.ofcl = officeImgs.clock;
    this.ofc = officeImgs.chair;
    this.ofdoff = officeImgs.deskOff;
    this.ofb = officeImgs.bin;

    this.bedo = bedImgs.dresserO;
    this.babc = bathImgs.bathC;
    this.baso = bathImgs.sinkO;
    this.ditbo = diningImgs.tableBolognese;
    this.ditce = diningImgs.tableCereal;
    this.ditdu = diningImgs.tableDuck;
    this.ditdo = diningImgs.tableDonut;
    this.diteg = diningImgs.tableEggs;
    this.ditfu = diningImgs.tableFryUp;
    this.dithd = diningImgs.tableHotdog;
    this.ditpi = diningImgs.tablePizza;
    this.ditri = diningImgs.tableRisotto;
    this.ditls = diningImgs.tableLeafSalad;
    this.ditsa = diningImgs.tableSandwich;
    this.ditta = diningImgs.tableTaco;
    this.ditts = diningImgs.tableTomSalad;
    this.ditwr = diningImgs.tableWrap;
    this.ditfw = diningImgs.foodWaste2;
    this.kic1p = kitchenImgs.dirtyPlates;
    this.kic2fw = kitchenImgs.foodWaste1;
    this.kifoe = kitchenImgs.fridgeOEmpty;
    this.kifof = kitchenImgs.fridgeOFull;
    this.kic1o = kitchenImgs.cab1O;
    this.kic2o = kitchenImgs.cab2O;
    this.kiso = kitchenImgs.sinkO;
    this.kioon = kitchenImgs.ovenOn;
    this.lrpd = livingImgs.plantDead;
    this.lrtvon = livingImgs.tvOn;
    this.ofdon = officeImgs.deskOn;
  }
}

export const imageDirectory = new ImageDirectory();
