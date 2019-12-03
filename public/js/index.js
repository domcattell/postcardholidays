const mobile = (/iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
if (mobile) {
    $('.desk-view').css('display', 'none');
} else {
    $('.mobile-view').css('display', 'none');
}