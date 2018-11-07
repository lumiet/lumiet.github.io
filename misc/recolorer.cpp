#include <Magick++.h> 
#include <iostream> 
#include <vector>
#include <ctime>
using namespace std;
using namespace Magick;

//https://stackoverflow.com/questions/23830471/convert-image-color-without-changing-its-transparent-background

/////////
string fakemonname = "tempestrike";
int layers = 8;
////////
enum layers {LINEART, SHADING, UNCHANGING, EYES, QUARTERNARY, TERTIARY, SECONDARY, PRIMARY};
enum rarity {COMMON, UNCOMMON, RARE, VERYRARE, ULTIMATE};

int checkRarity(int odds) {
	if (odds <= 80) {
		return COMMON;
	}
	else if (odds <= 95) {
		return UNCOMMON;
	}
	else if (odds <= 98) {
		return RARE;
	}
	else {
		return VERYRARE;
	}
	return COMMON;
}

int setDiffHue(int rarity) {
	int startdiff = 0;
	switch (rarity) {
	case COMMON:
		if (rand() % 2 == 0) {
			return (rand() % 5)*-1;
		}
		return rand() % 5;
		break;
	case UNCOMMON:
			startdiff = 5;		
		if (rand() % 2 == 0) {
			return (rand() % 10 + startdiff)*-1;
		}
		return rand() % 10 + startdiff;
		break;
	case RARE:
			startdiff = 15;		
		if (rand() % 2 == 0) {
			return (rand() % 20 + startdiff)*-1;
		}
		return rand() % 20 + startdiff;
		break;
	case VERYRARE:
			startdiff = 35;
		if (rand() % 2 == 0) {
			return (rand() % 65 + startdiff)*-1;
		}
		return rand() % 65 + startdiff;
		break;
	default: break;
	}
}
int setDiffValSat(int rarity) {
	switch (rarity) {
	case COMMON:
		if (rand() % 2 == 0) {
			return (rand() % 5)*-1;
		}
		return rand() % 5;
		break;
	case UNCOMMON:		
		if (rand() % 2 == 0) {
			return (rand() % 15)*-1;
		}
		return rand() % 15;
		break;
	case RARE:
		if (rand() % 2 == 0) {
			return (rand() % 50)*-1;
		}
		return rand() % 50;
		break;
	case VERYRARE:
		if (rand() % 2 == 0) {
			return (rand() % 80)*-1;
		}
		return rand() % 80;
		break;
	default: break;
	}
}
int main(int argc, char **argv)
{
	while (true) {
		InitializeMagick(*argv);
		srand((unsigned int)time(NULL));

		vector<Image> originalimage;
		Image newimage("250x250", Color("transparent"));
		try {
			for (int i = layers - 1; i >= 0; i--) {
				Image layer;
				string filepath = "resources/" + fakemonname + "/" + fakemonname;
				switch (i) {
				case LINEART: filepath += "lineart.png";
					break;
				case SHADING: filepath += "shading.png";
					break;
				case UNCHANGING: filepath += "unchanging.png";
					break;
				case EYES: filepath += "eyes.png";
					break;
				case QUARTERNARY: filepath += "quarternary.png";
					break;
				case TERTIARY: filepath += "tertiary.png";
					break;
				case SECONDARY: filepath += "secondary.png";
					break;
				case PRIMARY: filepath += "primary.png";
					break;
				}
				layer.read(filepath);

				/*Modulate percent hue, saturation, and brightness of an image. Modulation of saturation and brightness
				is as a ratio of the current value (100.0 for no change). Modulation of hue is an absolute rotation of
				-180 degrees to +180 degrees from the current position corresponding to an argument range of 0 to 200.0
				(100.0 for no change).*/
				double rarityodds = /*rand() % 100*/99;
				int rarity = checkRarity(rarityodds);
				int huediff = setDiffHue(rarity);
				int satdiff = setDiffValSat(rarity);
				int valdiff = setDiffValSat(rarity);
				

				if (i != SHADING && i != UNCHANGING && i != LINEART) {
					layer.modulate(100 - satdiff, 100 - valdiff, 100 - huediff);
				}

				if (i == SHADING) {
					newimage.composite(layer, 0, 0, MultiplyCompositeOp);
				}
				else {
					newimage.composite(layer, 0, 0, OverCompositeOp);
				}
			}
			newimage.write("results/"+ fakemonname +"/" + to_string((int)rand()) + ".png");
		}
		catch (Exception &error_)
		{
			cout << "Caught exception: " << error_.what() << endl;
			system("pause");
			return 1;
		}
	}
	return 0;

}
