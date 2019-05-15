export class Config {

  // TODO: get TOKEN from env vars
  public static readonly BOT_NAME = 'minecraft-locations';
  public static readonly CHANNEL_NAME = 'locations';
  public static readonly COMMAND_PREFIX = '!';
  public static readonly COMMANDS = [
    {
      color: 65280,
      name: '!add',
      description: 'Add a location',
      args: '{locationName} {locationX} {locationY} {locationZ}',
      example: '!add "Witch Hut" 1000 55 2200',
    },
    {
      color: 16711680,
      name: '!help',
      description: 'Prints this help text',
      args: 'None',
      example: '!help',
    },
    {
      color: 49151,
      name: '!list',
      description: 'Lists all saved locations',
      args: 'None',
      example: '!list',
    },
    {
      color: 16711680,
      name: '!remove',
      description: 'Remove a saved location',
      args: '{locationID}',
      example: '!remove 10',
    },
    {
      color: 16711935,
      name: '!update',
      description: 'Update a saved location',
      args: '{locationID} "{locationName}" {locationX} {locationY} {locationZ}',
      example: '!update 10 "Witch Hut" 1000 55 2200',
    },
  ];

}