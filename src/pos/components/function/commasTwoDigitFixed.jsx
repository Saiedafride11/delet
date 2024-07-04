export const commasTwoDigitFixed = (text) => {
  const cleanText = text.replace(/[^\d.]/g, "");
  const parts = cleanText.split(".");
  if (parts.length > 2 || cleanText.startsWith(".")) {
    return text;
  }
  if (parts.length > 1) {
    parts[1] = parts[1].length > 2 ? parts[1].substring(0, 2) : parts[1];
  }
  const formattedText = parts.join(".");
  const regExp = /(\d{1,3})(?=(\d{3})+(?!\d))/g;
  const thousandSeparatedText = formattedText.replace(regExp, "$1,");

  return thousandSeparatedText;
};

// class _NumberCommaFormatter extends TextInputFormatter {
//   @override
//   TextEditingValue formatEditUpdate(
//     TextEditingValue oldValue,
//     TextEditingValue newValue,
//   ) {
//     final cleanText = newValue.text.replaceAll(RegExp(r'[^\d.]'), '');

//     final parts = cleanText.split('.');

//     // Ensure only one dot is allowed
//     if (parts.length > 2 || cleanText.startsWith('.')) {
//       // If more than one dot or starts with a dot, discard the latest dot
//       return oldValue;
//     }

//     if (parts.length > 1) {
//       // Ensure only two decimal places are allowed
//       parts[1] = parts[1].length > 2 ? parts[1].substring(0, 2) : parts[1];
//     }

//     final formattedText = parts.join('.');
//     final thousandSeparatedText = _formatNumber(formattedText);

//     return newValue.copyWith(
//       text: thousandSeparatedText,
//       selection: TextSelection.collapsed(offset: thousandSeparatedText.length),
//     );
//   }

//   String _formatNumber(String text) {
//     final regExp = RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))');
//     return text.replaceAllMapped(regExp, (match) => '${match[1]},');
//   }
// }
