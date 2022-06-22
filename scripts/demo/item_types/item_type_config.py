DEFAULT_HARVEST_THESIS = "1"
DEFAULT_HARVEST_SOUND = "2"
DEFAULT_HARVEST_ARTICLE = "3"
DEFAULT_HARVEST_REPORT = "4"
DEFAULT_HARVEST_BOOK = "5"
DEFAULT_HARVEST_PATENT = "6"
DEFAULT_HARVEST_CARTOGRAPHIC_MATERIAL = "7"
DEFAULT_HARVEST_LECTURE = "8"
DEFAULT_HARVEST_IMAGE = "9"
DEFAULT_HARVEST_CONFERENCE_OBJECT = "10"
DEFAULT_HARVEST_DATASET = "11"
DEFAULT_HARVEST_MULTIPLE = "12"
DEFAULT_HARVEST_DDI = "13"
DEFAULT_DDI = "14"
DEFAULT_JOURNAL_ARTICLE = "10001"
DEFAULT_DEPARTMENTAL_BULLETIN_PAPER = "10002"
DEFAULT_CONFERENCE_PAPER = "10003"
DEFAULT_ARTICLE = "10004"
DEFAULT_PRESENTATION = "10005"
DEFAULT_THESIS_OR_DISSERTATION = "10006"
DEFAULT_ITEM_TYPE_SIMPLE = "30001"
DEFAULT_ITEM_TYPE_FULL = "30002"

EXCLUSION_LIST = []
# Exclusion item type id list. The ID set in the list will not be registered.
# e.g.: EXCLUSION_LIST = [30001, 30002] or EXCLUSION_LIST = [DEFAULT_ITEM_TYPE_SIMPLE, DEFAULT_ITEM_TYPE_FULL]

HARVESTING_ITEM_TYPE_LIST = [
    DEFAULT_HARVEST_THESIS,
    DEFAULT_HARVEST_SOUND,
    DEFAULT_HARVEST_ARTICLE,
    DEFAULT_HARVEST_REPORT, 
    DEFAULT_HARVEST_BOOK, 
    DEFAULT_HARVEST_PATENT,
    DEFAULT_HARVEST_CARTOGRAPHIC_MATERIAL,
    DEFAULT_HARVEST_LECTURE,
    DEFAULT_HARVEST_IMAGE,
    DEFAULT_HARVEST_CONFERENCE_OBJECT,
    DEFAULT_HARVEST_DATASET,
    DEFAULT_HARVEST_MULTIPLE,
    DEFAULT_HARVEST_DDI
]
# e.g.: HARVESTING_ITEM_TYPE_LIST = [30001, 30002] or HARVESTING_ITEM_TYPE_LIST = [DEFAULT_ITEM_TYPE_SIMPLE, DEFAULT_ITEM_TYPE_FULL]

SPECIFIED_LIST = []
# Specified item type id list. The ID set in the list will be deleted and registered.
# e.g.: SPECIFIED_LIST = [30001, 30002] or SPECIFIED_LIST = [DEFAULT_ITEM_TYPE_SIMPLE, DEFAULT_ITEM_TYPE_FULL]