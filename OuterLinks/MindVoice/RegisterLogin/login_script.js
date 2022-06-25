$('#signup').click(function () {
    $('.box').css('transform', 'translateX(82%');
    $('.login').addClass('hidden');
    $('.signup').removeClass('hidden');
})

$('#signin').click(function () {
    $('.box').css('transform', 'translateX(0%');
    $('.signup').addClass('hidden');
    $('.login').removeClass('hidden');
})

