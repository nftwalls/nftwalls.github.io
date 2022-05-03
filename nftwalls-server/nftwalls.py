import requests
import json
import numpy as np
import io
from skimage.io import imread
from PIL import Image
from flask import Flask, send_file, request
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

app = Flask(__name__)

SLIVER_GENERALIZATION = ["paranormiesnft", "doodles-official"]

SUPPORTED_PROJECTS = {
    "Paranormies": {
        "banner_supported": True,
        "contract_name": "paranormiesnft"
    },
    "Moonbirds": {
        "contract_name": "proof-moonbirds"
    },
    "CryptoBatz": {
        "banner_supported": True,
        "contract_name": "cryptobatz-by-ozzy-osbourne"
    },
    "Alien Frens": {
        "contract_name": "alienfrensnft"
    },
    "Azuki": {
        "contract_name": "azuki"
    },
    "Cool Cats": {
        "contract_name": "cool-cats-nft"
    },
    "Kaiju Kingz": {
        "contract_name": "kaiju-kingz"
    },
    "Deadfrenz Collection": {
        "contract_name": "deadfrenz-collection"
    },
    "Deadfellaz Collection": {
        "contract_name": "deadfellaz"
    },
    "Doodles": {
        "contract_name": "doodles-official"
    }
}

BANNER = {
    "cryptobatz-by-ozzy-osbourne": "banners/crypto_batz_banner.png",
    "paranormiesnft": "banners/paranormies_banner.png"
}

@app.route("/")
def ping_check():
    return "I am alive"

@app.route("/getSupportedProjects")
def get_projects():
    return SUPPORTED_PROJECTS

@app.route("/getProjectInformation")
def get_project_information():
    query_args = request.args

    asset_project_name = query_args.get('asset_project_name')
    
    if (asset_project_name == None):
        return {
            "error_message": "Missing one of the needed parameters",
            "required_attributes": ["asset_project_name"]
        }
    else:
        response = requests.get('https://api.opensea.io/api/v1/collection/{0}'.format(asset_project_name), headers={
            "Accept": "application/json",
            "X-API-KEY": ""
        })
        collection = json.loads(response.text).get('collection')

        return {
            "collection_image": collection["banner_image_url"], 
            "twitter_username": collection["twitter_username"], 
            "instagram_username": collection["instagram_username"], 
            "website_link": collection["external_url"], 
            "discord_link": collection["discord_url"],
            "asset_count": collection.get("stats", {}).get("total_supply")
        }

@app.route("/getSupportedBanners")
def get_banners():
    return BANNER

@app.route("/getWallpaper")
def get_wallpaper():
    query_args = request.args

    asset_id = query_args.get('asset_id')
    asset_project_name = query_args.get('asset_project_name')
    banner_needed = query_args.get('banner_needed')

    if (None in (asset_id, asset_project_name, banner_needed)):
        return {
            "error_message": "Missing one of the needed parameters",
            "required_attributes": ["asset_id", "asset_project_name", "banner_needed"]
        }
    else:
        asset_details = get_asset_name_and_url(asset_id, asset_project_name)

        if (asset_project_name in SLIVER_GENERALIZATION):
            background_np_array = create_mobile_wallpaper_with_sliver_generalization(**asset_details)
        else:
            background_np_array = create_mobile_wallpaper_with_point_generalization(**asset_details)
        
        if (banner_needed in [1, "True", "true"]):
            add_banner_to_wallpaper(background_np_array, asset_project_name)
        
        background_image_file = get_image_file_from_numpy(background_np_array)
        
        return send_file(background_image_file, mimetype='image/PNG')


def get_asset_name_and_url(asset_id, collection_slug):
    url = 'https://api.opensea.io/api/v1/assets?token_ids={0}&order_direction=desc&collection_slug={1}&limit=20&include_orders=false'.format(asset_id, collection_slug)

    headers = {
        "Accept": "application/json",
        "X-API-KEY": ""
    }

    response = requests.get(url, headers=headers)

    asset = json.loads(response.text)

    asset_name = asset['assets'][0]['name']
    asset_url = asset['assets'][0]['image_original_url']

    return {
        "asset_name": asset_name, 
        "asset_url": asset_url 
        }

def create_mobile_wallpaper_with_sliver_generalization(asset_name, asset_url):
    if ('ipfs://' in asset_url):
        asset_url = "https://ipfs.io/ipfs/" + asset_url.split("ipfs://")[1]

    img = Image.open(requests.get(asset_url, stream = True).raw).resize((1080, 1080), Image.ANTIALIAS).convert('RGB')
    img = np.array(img)

    # Adjust opacity of the image to 100%
    new_img = np.zeros((img.shape[0], img.shape[1], 4))
    new_img[:, :, :3] = img[:, :, :3]
    new_img[:, :, 3] = 255
    
    # Adjust height based on required image ratio
    HEIGHT = int(new_img.shape[1] / 9 * 18)
    BACKGROUND = HEIGHT - new_img.shape[0]

    # Create wallpaper with empty background space and asset
    wallpaper = np.zeros((HEIGHT, new_img.shape[1], 4))
    wallpaper[BACKGROUND:, :, :] = new_img
    
    background_img = np.resize(new_img[2:5, :, :], (BACKGROUND, img.shape[1], 4))
    wallpaper[:BACKGROUND][:][:] = background_img

    return wallpaper

def create_mobile_wallpaper_with_point_generalization(asset_name, asset_url):
    if ('ipfs://' in asset_url):
        asset_url = "https://ipfs.io/ipfs/" + asset_url.split("ipfs://")[1]

    img = Image.open(requests.get(asset_url, stream = True).raw).resize((1080, 1080), Image.ANTIALIAS).convert('RGB')
    img = np.array(img)

    # Adjust opacity of the image to 100%
    new_img = np.zeros((img.shape[0], img.shape[1], 4))
    new_img[:, :, :3] = img[:, :, :3]
    new_img[:, :, 3] = 255
    
    # Adjust height based on required image ratio
    HEIGHT = int(new_img.shape[1] / 9 * 16)
    BACKGROUND = HEIGHT - new_img.shape[0]
    
    # Create mobile_wallpaper with empty background space and asset
    mobile_wallpaper = np.zeros((HEIGHT, new_img.shape[1], 4))
    mobile_wallpaper[BACKGROUND:, :, :] = new_img

    point_background = np.mean([new_img[0][i] for i in range(0, 1080, 54)], axis=0).astype(int)
    
    background_img = np.tile(point_background, (BACKGROUND, new_img.shape[1], 1))
    mobile_wallpaper[:BACKGROUND, :, :] = background_img

    return mobile_wallpaper

def get_image_file_from_numpy(image_np):
    # Creating Image object
    img = Image.fromarray(image_np.astype(np.uint8))

    # Creating in memory file
    image_file = io.BytesIO()

    # Saving image to the in-memory file
    img.save(image_file, 'PNG')

    image_file.seek(0)

    return image_file

def add_banner_to_wallpaper(image_np, asset_project_name, banner_width_percentage=0.8):
    # Get banner image that is stored locally
    banner_image_name = BANNER.get(asset_project_name)
    background_banner = Image.fromarray(imread(banner_image_name))

    # Scale banner image size based on mobile wallpaper dimensions
    banner_width = int(image_np.shape[1] * banner_width_percentage) 
    width_scale = (banner_width / float(background_banner.size[0]))
    banner_height = int((float(background_banner.size[1]) * float(width_scale)))
    background_banner = background_banner.resize((banner_width, banner_height), Image.ANTIALIAS)
    background_banner = np.array(background_banner)

    # Center the banner vertically in the mobile wallpaper
    WIDTH_OFFSET = int((image_np.shape[1] - background_banner.shape[1])/2)
    HEIGHT_OFFSET = 350

    # Adding the banner to the image
    image_np[HEIGHT_OFFSET:HEIGHT_OFFSET + background_banner.shape[0], WIDTH_OFFSET:WIDTH_OFFSET + background_banner.shape[1], :][background_banner[:, :, 3] != 0] = background_banner[background_banner[:, :, 3] != 0]

if __name__ == "__main__":
	app.run(port=8000)