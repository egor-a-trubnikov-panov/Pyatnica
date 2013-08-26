/**
 * Created by egortrubnikov on 16.08.13.
 */

PYatnica = {
  mast: ["♥", "♦", "♠", "♣"],
  koloda: [2, 3, 4, 5, 6, 7, 8, 9, 10, {id: "J", name: "Валет"}, {id: "L", name: "Дама"}, {id: "K", name: "Король"}, {id: "A", name: "Туз"}],
  display: {
    width: document.width,
    height: document.height
  },
  Stek: [],
  render: function ()
  {
    var Html = [], temp = "";

    function name(j)
    {
      return typeof(PYatnica.koloda[j]) == "number" ? PYatnica.koloda[j] : PYatnica.koloda[j].id;
    }

    for (var i = 0, l = this.mast.length; i < l; i++) {
      for (var j = 0, l2 = this.koloda.length; j < l2; j++) {
        Html.push('<div class="card m');
        temp = name(j);
        Html.push([temp, '" suit="', i, '"', 'val="', j, '"', '><h3>', temp, '</h3><div class="picture">'].join(''));
        if (typeof(this.koloda[j]) == "number") {
          for (var t = 0; t < this.koloda[j]; t++) {
            Html.push('<div>' + this.mast[i] + '</div>');
          }
        } else {
          Html.push(['<div>', this.koloda[j].name, '</div><div>', this.mast[i], '</div>'].join(''));
        }
        Html.push(['</div><h3>', temp, '</h3></div>'].join(''));
      }
    }
    $(".card__conteiner").html(Html.join(''));
  },
  kard: [], player1: [], player2: [],
  sort: function ()
  {
    this.kard = $(".card");
    var leng_th = this.kard.length, R = 0;

    function Random(min, max)//  от 0 до 5 будет из чисел 0,1,2,3,4
    {
      return Math.floor(Math.random() * (max - min) + min);
    }

    for (var i = 0; leng_th != 0; i++) {
      R = Random(0, leng_th);
      this.player1.push(this.kard[R]);
      this.kard.splice(R, 1);
      leng_th--;

      R = Random(0, leng_th);
      this.player2.push(this.kard[R]);
      this.kard.splice(R, 1);
      leng_th--;
    }
    this.kard = $(".card");
  },
  start: function ()
  {
    var top = this.display.height / 2, left = this.display.width / 2;
    this.kard.addClass("shirt").css({"top": top, "left": left});
    $(PYatnica.player1[0]).addClass("shadow");
    $(PYatnica.player2[0]).addClass("shadow");

    var i = 0, trigger = true, length_ = PYatnica.kard.length;
    $(PYatnica.player2[(length_ / 2) - 1]).addClass("shadow");
    var tusovka = setInterval(function ()
    {
      if (i <= length_) {

        if (trigger) {
          $(PYatnica.player1[i]).animate({"top": "110", "left": "85"}, "slow");
          trigger = false;
          i--;
        } else {
          left = PYatnica.display.width - 85;
          $(PYatnica.player2[i]).animate({"top": "110", "left": left}, "slow");
          trigger = true;
        }
        i++;
      } else {
        $(PYatnica.player2[(length_ / 2) - 1]).removeClass("shadow");
        clearInterval(tusovka);

      }

    }, 50);///500

  },
  game: function ()
  {

    //    $("#Pravila").click(function ()
    //    {
    //      $(this).slideUp("slow");
    //      $(".card__conteiner").css("-webkit-filter", "none");
    //    });

    var top = this.display.height / 2, left = this.display.width / 2, stek1 = 0, stek2 = 0, gran = false;
    $(".card__conteiner").click(function ()
    {

      function shadowControl()
      {
        $(PYatnica.player1).removeClass("shadow").addClass("shirt");
        $(PYatnica.player2).removeClass("shadow").addClass("shirt");
        $(PYatnica.player1[0]).addClass("shadow");
        $(PYatnica.player2[0]).addClass("shadow");
      }

      if (!gran) {
        gran = true;
        console.log("click");

        try {
          shadowControl();
          $(PYatnica.player1[1]).addClass("shadow");
          $(PYatnica.player2[1]).addClass("shadow");
        } catch (e) {
          console.log(e)
        }

        stek1 = parseInt($(PYatnica.player1[0]).animate({"top": top, "left": left}, "slow").removeClass("shirt").attr("val"));
        setTimeout(function ()
        {
          stek2 = parseInt($(PYatnica.player2[0]).animate({"top": top + 210, "left": left}, "slow").removeClass("shirt").attr("val"));

        }, 1000);

        setTimeout(function ()
        {
          if (stek1 > stek2) {
            PYatnica.Stek.push(PYatnica.player1[0], PYatnica.player2[0]);
            $(PYatnica.Stek).animate({"top": "110", "left": "85"}, "slow", function ()
            {
              shadowControl();
            });
            PYatnica.player1.splice(0, 1);
            PYatnica.player2.splice(0, 1);
            for (var i = 0, l = PYatnica.Stek.length; i < l; i++) {
              PYatnica.player1.push(PYatnica.Stek[0]);
              PYatnica.Stek.splice(0, 1);
            }

          } else {
            if (stek2 > stek1) {
              PYatnica.Stek.push(PYatnica.player1[0], PYatnica.player2[0]);
              $(PYatnica.Stek).animate({"top": "110", "left": PYatnica.display.width - 85}, "slow", function ()
              {
                shadowControl();
              });
              PYatnica.player1.splice(0, 1);
              PYatnica.player2.splice(0, 1);
              for (var i = 0, l = PYatnica.Stek.length; i < l; i++) {
                PYatnica.player2.push(PYatnica.Stek[0]);
                PYatnica.Stek.splice(0, 1);
              }

            } else {

              PYatnica.Stek.push(PYatnica.player1[0], PYatnica.player2[0]);
              PYatnica.player1.splice(0, 1);
              PYatnica.player2.splice(0, 1);
              for (var i = 0, l = PYatnica.Stek.length; i < l; i++) {
                $(PYatnica.Stek[i]).animate({"left": parseInt($(PYatnica.Stek[i]).css("left").substr(0, $(PYatnica.Stek[i]).css("left").length - 2)) - 200}, "slow");
              }

            }

          }

          gran = false;
        }, 2000)

      }

    })
  }

};

$(document).ready(function ()
{
  PYatnica.render();
  PYatnica.sort();
  PYatnica.start();
  PYatnica.game();

});
