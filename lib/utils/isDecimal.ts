export default function decimal(character: string) {
  var code = character.charCodeAt(0);

  return code >= 48 && code <= 57; /* 0-9 */
}
